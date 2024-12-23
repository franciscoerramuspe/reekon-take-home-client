export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  organizationId: string;
  role: 'admin' | 'operator';
  status: 'active' | 'inactive';
  preferences: {
    notifications: {
      email: boolean;
      push: boolean;
    };
    dashboard_layout: Record<string, any>;
  };
}
