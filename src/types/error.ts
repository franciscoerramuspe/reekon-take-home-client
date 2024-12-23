export interface ErrorLog {
  id: string;
  robotId: string;
  robotName: string;
  type: 'crash' | 'error' | 'warning';
  message: string;
  timestamp: string;
  stackTrace?: string;
  resolved: boolean;
}

export interface ErrorStats {
  daily: {
    date: string;
    crashes: number;
    errors: number;
    warnings: number;
  }[];
  total: {
    crashes: number;
    errors: number;
    warnings: number;
  };
}
