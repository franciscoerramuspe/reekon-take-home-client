import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import OrganizationPage from '../page';
import { organizationService } from '@/services/organizationService';

// Mock the organization service
jest.mock('@/services/organizationService');
jest.mock('@/hooks/useCustomToast', () => ({
  useCustomToast: () => ({
    success: jest.fn(),
    error: jest.fn(),
  }),
}));

describe('OrganizationPage', () => {
  const mockOrganization = {
    id: '1',
    name: 'Test Org',
    subscription: 'basic',
    max_robots: 5,
    settings: {
      api_keys: ['key1'],
      allowed_features: ['feature1'],
    },
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
  };

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    (organizationService.listOrganizations as jest.Mock).mockResolvedValue([mockOrganization]);
  });

  it('renders organization details', async () => {
    render(<OrganizationPage />);
    
    // Wait for the organization name to appear
    await waitFor(() => {
      expect(screen.getByDisplayValue('Test Org')).toBeInTheDocument();
    });
    
    // Check if other fields are rendered
    expect(screen.getByDisplayValue('5')).toBeInTheDocument();
    expect(screen.getByText('Basic')).toBeInTheDocument();
  });

  it('enables editing when Edit button is clicked', async () => {
    render(<OrganizationPage />);

    // Wait for the page to load
    await waitFor(() => {
      expect(screen.getByDisplayValue('Test Org')).toBeInTheDocument();
    });

    // Click edit button
    fireEvent.click(screen.getByText('Edit'));

    // Check if inputs are enabled
    const nameInput = screen.getByDisplayValue('Test Org');
    expect(nameInput).not.toBeDisabled();
  });

  it('updates organization when Save is clicked', async () => {
    // Mock the update function
    (organizationService.updateOrganization as jest.Mock).mockResolvedValue({
      ...mockOrganization,
      name: 'Updated Org',
    });

    render(<OrganizationPage />);

    // Wait for the page to load
    await waitFor(() => {
      expect(screen.getByDisplayValue('Test Org')).toBeInTheDocument();
    });

    // Click edit button
    fireEvent.click(screen.getByText('Edit'));

    // Update name
    const nameInput = screen.getByDisplayValue('Test Org');
    fireEvent.change(nameInput, { target: { value: 'Updated Org' } });

    // Click save
    fireEvent.click(screen.getByText('Save'));

    // Verify update was called
    await waitFor(() => {
      expect(organizationService.updateOrganization).toHaveBeenCalledWith(
        '1',
        expect.objectContaining({
          name: 'Updated Org',
        })
      );
    });
  });
}); 