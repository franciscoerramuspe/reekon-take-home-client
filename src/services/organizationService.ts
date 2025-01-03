const API_URL = 'https://take-home-reekon.vercel.app/api';

export interface Organization {
  id: string;
  name: string;
  subscription: 'basic' | 'pro' | 'enterprise';
  max_robots: number;
  settings: {
    allowed_features: string[];
    api_keys: string[];
  };
  created_at: string;
  updated_at: string;
}

class OrganizationService {
  private getHeaders() {
    const token = localStorage.getItem('token');
    return {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  }

  async listOrganizations(): Promise<Organization[]> {
    try {
      console.log('Making request to:', `${API_URL}/organizations`);
      const response = await fetch(`${API_URL}/organizations`);

      if (!response.ok) {
        throw new Error('Failed to fetch organizations');
      }

      return response.json();
    } catch (error) {
      console.error('Error listing organizations:', error);
      throw error;
    }
  }

  async createOrganization(data: {
    name: string;
    subscription?: 'basic' | 'pro' | 'enterprise';
    maxRobots?: number;
  }): Promise<Organization> {
    try {
      const response = await fetch(`${API_URL}/organizations/register`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({
          name: data.name,
          subscription: data.subscription || 'basic',
          maxRobots: data.maxRobots || 5,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create organization');
      }

      const responseData = await response.json();
      return responseData.organization;
    } catch (error) {
      console.error('Error creating organization:', error);
      throw error;
    }
  }

  async updateOrganization(
    id: string,
    data: {
      name?: string;
      max_robots?: number;
      subscription?: 'basic' | 'pro' | 'enterprise';
    }
  ): Promise<Organization> {
    try {
      const response = await fetch(`${API_URL}/organizations/${id}`, {
        method: 'PATCH',
        headers: this.getHeaders(),
        body: JSON.stringify(data),
      });

      if (response.status === 404) {
        throw new Error('Organization not found');
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update organization');
      }

      return response.json();
    } catch (error) {
      console.error('Error updating organization:', error);
      throw error;
    }
  }
}

export const organizationService = new OrganizationService();
