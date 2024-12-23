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
