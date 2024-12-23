import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RobotCard from '../RobotCard';

describe('RobotCard', () => {
  const mockRobot = {
    id: '1',
    name: 'Test Robot',
    status: 'online',
    battery_level: 75,
    location: {
      latitude: 42.3601,
      longitude: -71.0589,
    },
  };

  const mockProps = {
    robot: mockRobot,
    onDelete: jest.fn().mockResolvedValue(undefined),
    onUpdateStatus: jest.fn().mockResolvedValue(undefined),
    onClick: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders robot information correctly', () => {
    render(<RobotCard {...mockProps} />);
    
    expect(screen.getByText('Test Robot')).toBeInTheDocument();
    expect(screen.getByText('75%')).toBeInTheDocument();
    expect(screen.getByText(/online/i)).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    render(<RobotCard {...mockProps} />);
    
    const card = screen.getByTestId('robot-card');
    fireEvent.click(card);
    
    expect(mockProps.onClick).toHaveBeenCalled();
  });

  it('calls onDelete when delete button is clicked', async () => {
    render(<RobotCard {...mockProps} />);
    
    const deleteButton = screen.getByText(/delete/i).closest('button');
    await act(async () => {
      fireEvent.click(deleteButton);
    });
    
    expect(mockProps.onDelete).toHaveBeenCalledWith('1');
  });

  it('opens edit modal and updates status', async () => {
    render(<RobotCard {...mockProps} />);
    
    // Click edit status button to open modal
    const editButton = screen.getByText(/edit status/i).closest('button');
    await act(async () => {
      fireEvent.click(editButton);
    });

    // Wait for modal to appear and interact with it
    const statusSelect = screen.getByRole('combobox');
    const batteryInput = screen.getByDisplayValue('75');
    const updateButton = screen.getByRole('button', { name: /update/i });

    await act(async () => {
      // Change status
      await userEvent.selectOptions(statusSelect, 'offline');
      
      // Change battery level
      await userEvent.clear(batteryInput);
      await userEvent.type(batteryInput, '50');
      
      // Click update
      await userEvent.click(updateButton);
    });
    
    expect(mockProps.onUpdateStatus).toHaveBeenCalledWith('1', 'offline', 50);
  });
}); 