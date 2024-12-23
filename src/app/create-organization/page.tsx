'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCustomToast } from '@/hooks/useCustomToast';
import { organizationService } from '@/services/organizationService';

export default function CreateOrganizationPage() {
  const router = useRouter();
  const toast = useCustomToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<{
    name: string;
    subscription: 'basic' | 'pro' | 'enterprise';
    maxRobots: number;
  }>({
    name: '',
    subscription: 'basic',
    maxRobots: 5
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await organizationService.createOrganization(formData);
      toast.success('Organization created successfully');
      router.push('/login');
    } catch (error) {
      toast.error('Failed to create organization');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-black">
      <Card className="w-full max-w-[500px]">
        <CardHeader>
          <CardTitle className="text-2xl">Create New Organization</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Organization Name</label>
              <Input
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter organization name"
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Subscription Tier</label>
              <Select
                value={formData.subscription}
                onValueChange={(value: 'basic' | 'pro' | 'enterprise') => 
                  setFormData({ ...formData, subscription: value })}
                disabled={loading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select subscription" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic</SelectItem>
                  <SelectItem value="pro">Pro</SelectItem>
                  <SelectItem value="enterprise">Enterprise</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Maximum Robots</label>
              <Input
                type="number"
                value={formData.maxRobots}
                onChange={(e) => setFormData({ ...formData, maxRobots: parseInt(e.target.value) })}
                min={1}
                max={100}
                disabled={loading}
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Creating...' : 'Create Organization'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
} 