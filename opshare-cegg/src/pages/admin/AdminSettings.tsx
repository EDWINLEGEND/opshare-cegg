import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AdminSettings = () => {
  return (
    <AdminLayout>
      <div className="p-4 md:p-6">
        <h1 className="text-2xl font-bold mb-6">Admin Settings</h1>
        
        <Tabs defaultValue="general" className="w-full">
          <div className="overflow-x-auto pb-2">
            <TabsList className="mb-4">
              <TabsTrigger value="general">General Settings</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="api">API Keys</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>Platform Settings</CardTitle>
                <CardDescription>Configure general platform settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="platform-name">Platform Name</Label>
                  <Input id="platform-name" defaultValue="OpShare" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="support-email">Support Email</Label>
                  <Input id="support-email" type="email" defaultValue="support@opshare.com" />
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                    <p className="text-sm text-gray-500">Take the site offline for maintenance</p>
                  </div>
                  <Switch id="maintenance-mode" />
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="new-registrations">Allow New Registrations</Label>
                    <p className="text-sm text-gray-500">Enable user registration</p>
                  </div>
                  <Switch id="new-registrations" defaultChecked />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Configure security and authorization settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="two-factor">Require Two-Factor Authentication</Label>
                    <p className="text-sm text-gray-500">Enforce 2FA for admin accounts</p>
                  </div>
                  <Switch id="two-factor" defaultChecked />
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="password-expiry">Password Expiry</Label>
                    <p className="text-sm text-gray-500">Force password resets every 90 days</p>
                  </div>
                  <Switch id="password-expiry" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="session-timeout">Admin Session Timeout (minutes)</Label>
                  <Input id="session-timeout" type="number" defaultValue="60" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Security Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Configure administrator notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="notify-new-users">New User Registrations</Label>
                    <p className="text-sm text-gray-500">Get notified when new users join</p>
                  </div>
                  <Switch id="notify-new-users" defaultChecked />
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="notify-reports">User Reports</Label>
                    <p className="text-sm text-gray-500">Get notified about reported content</p>
                  </div>
                  <Switch id="notify-reports" defaultChecked />
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="notify-listings">New Listings</Label>
                    <p className="text-sm text-gray-500">Get notified about new item listings</p>
                  </div>
                  <Switch id="notify-listings" />
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="notify-transactions">Transactions</Label>
                    <p className="text-sm text-gray-500">Get notified about new transactions</p>
                  </div>
                  <Switch id="notify-transactions" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Notification Preferences</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="api">
            <Card>
              <CardHeader>
                <CardTitle>API Configuration</CardTitle>
                <CardDescription>Manage API keys and integration settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="api-key">Admin API Key</Label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Input id="api-key" defaultValue="sk_admin_2023abcdef1234567890" className="sm:rounded-r-none" />
                    <Button variant="outline" className="sm:rounded-l-none">Regenerate</Button>
                  </div>
                  <p className="text-sm text-gray-500">Used for secure API access to administrative endpoints</p>
                </div>
                
                <div className="pt-4">
                  <h3 className="font-medium mb-2">Third-Party Integrations</h3>
                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div className="space-y-0.5">
                        <Label htmlFor="payment-integration">Payment Gateway</Label>
                        <p className="text-sm text-gray-500">Configure payment processing</p>
                      </div>
                      <Switch id="payment-integration" defaultChecked />
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div className="space-y-0.5">
                        <Label htmlFor="analytics-integration">Analytics Integration</Label>
                        <p className="text-sm text-gray-500">Connect to analytics platform</p>
                      </div>
                      <Switch id="analytics-integration" defaultChecked />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save API Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;