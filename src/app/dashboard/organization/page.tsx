'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCustomToast } from "@/hooks/useCustomToast";
import { organizationService } from '@/services/organizationService';
import { Organization } from '@/types/organization';

export default function OrganizationPage() {
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editedValues, setEditedValues] = useState({
    name: '',
    max_robots: 0
  });
  const toast = useCustomToast();

  useEffect(() => {
    const fetchOrganization = async () => {
      try {
        const orgs = await organizationService.listOrganizations();
        setOrganization(orgs[0]);
        setEditedValues({
          name: orgs[0].name,
          max_robots: orgs[0].max_robots
        });
      } catch (error) {
        console.error('Failed to fetch organization:', error);
        toast.error('Failed to load organization details');
      } finally {
        setLoading(false);
      }
    };

    fetchOrganization();
  }, []);

  const handleSave = async () => {
    try {
      if (!organization) return;
      
      // Validate max_robots
      if (editedValues.max_robots > 20) {
        toast.error('Maximum robots cannot exceed 20');
        return;
      }

      const updatedOrg = await organizationService.updateOrganization(organization.id, {
        name: editedValues.name,
        max_robots: editedValues.max_robots
      });

      setOrganization(updatedOrg);
      setEditing(false);
      toast.success('Organization updated successfully');
    } catch (error) {
      console.error('Failed to update organization:', error);
      toast.error('Failed to update organization');
    }
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  if (!organization) {
    return <div className="p-8">No organization found</div>;
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Organization Settings</h1>
        {!editing ? (
          <Button onClick={() => setEditing(true)}>Edit</Button>
        ) : (
          <div className="space-x-2">
            <Button variant="outline" onClick={() => setEditing(false)}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        )}
      </div>
      
      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle>General Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Organization Name</label>
              <Input 
                value={editing ? editedValues.name : organization.name}
                onChange={(e) => setEditedValues({ ...editedValues, name: e.target.value })}
                disabled={!editing}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Subscription Tier</label>
              <Input 
                value={organization.subscription} 
                disabled 
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Maximum Robots (Max: 20)</label>
              <Input 
                type="number"
                min={1}
                max={20}
                value={editing ? editedValues.max_robots : organization.max_robots}
                onChange={(e) => setEditedValues({ 
                  ...editedValues, 
                  max_robots: Math.min(20, parseInt(e.target.value) || 0)
                })}
                disabled={!editing}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>API Keys</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {organization.settings.api_keys.map((key, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input value={key} disabled />
                  <Button variant="destructive" size="sm">
                    Revoke
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {organization.settings.allowed_features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 