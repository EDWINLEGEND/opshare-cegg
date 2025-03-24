import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Save, 
  Settings, 
  Shield, 
  Bell, 
  Key, 
  RefreshCw,
  CreditCard,
  BarChart
} from 'lucide-react';

const AdminSettings = () => {
  return (
    <AdminLayout>
      <div className="p-4 md:p-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">Admin Settings</h1>
        
        <Tabs defaultValue="general" className="w-full">
          <div className="overflow-x-auto pb-2">
            <TabsList className="mb-6 bg-gradient-to-r from-gray-100 to-gray-50 p-1 shadow-sm border border-gray-200/70">
              <TabsTrigger 
                value="general" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-green-600 data-[state=active]:text-white"
              >
                <Settings className="h-4 w-4 mr-2" />
                General Settings
              </TabsTrigger>
              <TabsTrigger 
                value="security"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white"
              >
                <Shield className="h-4 w-4 mr-2" />
                Security
              </TabsTrigger>
              <TabsTrigger 
                value="notifications"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-amber-600 data-[state=active]:text-white"
              >
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </TabsTrigger>
              <TabsTrigger 
                value="api"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-purple-600 data-[state=active]:text-white"
              >
                <Key className="h-4 w-4 mr-2" />
                API Keys
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="general">
            <Card className="border border-gray-200/70 shadow-sm overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200/70">
                <div className="flex items-center">
                  <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <Settings className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <CardTitle className="text-gray-800">Platform Settings</CardTitle>
                    <CardDescription className="text-gray-600">Configure general platform settings</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                <div className="space-y-2">
                  <Label htmlFor="platform-name" className="text-gray-700">Platform Name</Label>
                  <Input 
                    id="platform-name" 
                    defaultValue="OpShare" 
                    className="border-gray-300 focus-visible:ring-gray-400"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="support-email" className="text-gray-700">Support Email</Label>
                  <Input 
                    id="support-email" 
                    type="email" 
                    defaultValue="support@opshare.com" 
                    className="border-gray-300 focus-visible:ring-gray-400"
                  />
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-4 bg-gray-50 rounded-lg border border-gray-200/50">
                  <div className="space-y-0.5">
                    <Label htmlFor="maintenance-mode" className="text-gray-700">Maintenance Mode</Label>
                    <p className="text-sm text-gray-500">Take the site offline for maintenance</p>
                  </div>
                  <Switch id="maintenance-mode" />
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-4 bg-gray-50 rounded-lg border border-gray-200/50">
                  <div className="space-y-0.5">
                    <Label htmlFor="new-registrations" className="text-gray-700">Allow New Registrations</Label>
                    <p className="text-sm text-gray-500">Enable user registration</p>
                  </div>
                  <Switch id="new-registrations" defaultChecked />
                </div>
              </CardContent>
              <CardFooter className="border-t border-gray-200/70 bg-gray-50 flex justify-end p-4">
                <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-sm">
                  <Save className="h-4 w-4 mr-2" />
                  Save Settings
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="security">
            <Card className="border border-gray-200/70 shadow-sm overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200/70">
                <div className="flex items-center">
                  <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <Shield className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-gray-800">Security Settings</CardTitle>
                    <CardDescription className="text-gray-600">Configure security and authorization settings</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-4 bg-blue-50 rounded-lg border border-blue-200/50">
                  <div className="space-y-0.5">
                    <Label htmlFor="two-factor" className="text-gray-700">Require Two-Factor Authentication</Label>
                    <p className="text-sm text-gray-500">Enforce 2FA for admin accounts</p>
                  </div>
                  <Switch id="two-factor" defaultChecked />
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-4 bg-blue-50 rounded-lg border border-blue-200/50">
                  <div className="space-y-0.5">
                    <Label htmlFor="password-expiry" className="text-gray-700">Password Expiry</Label>
                    <p className="text-sm text-gray-500">Force password resets every 90 days</p>
                  </div>
                  <Switch id="password-expiry" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="session-timeout" className="text-gray-700">Admin Session Timeout (minutes)</Label>
                  <Input 
                    id="session-timeout" 
                    type="number" 
                    defaultValue="60" 
                    className="border-gray-300 focus-visible:ring-gray-400 max-w-[150px]"
                  />
                </div>
              </CardContent>
              <CardFooter className="border-t border-gray-200/70 bg-gray-50 flex justify-end p-4">
                <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-sm">
                  <Save className="h-4 w-4 mr-2" />
                  Save Security Settings
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card className="border border-gray-200/70 shadow-sm overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200/70">
                <div className="flex items-center">
                  <div className="h-8 w-8 bg-amber-100 rounded-full flex items-center justify-center mr-3">
                    <Bell className="h-4 w-4 text-amber-600" />
                  </div>
                  <div>
                    <CardTitle className="text-gray-800">Notification Settings</CardTitle>
                    <CardDescription className="text-gray-600">Configure administrator notifications</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-4 bg-amber-50 rounded-lg border border-amber-200/50">
                  <div className="space-y-0.5">
                    <Label htmlFor="notify-new-users" className="text-gray-700">New User Registrations</Label>
                    <p className="text-sm text-gray-500">Get notified when new users join</p>
                  </div>
                  <Switch id="notify-new-users" defaultChecked />
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-4 bg-amber-50 rounded-lg border border-amber-200/50">
                  <div className="space-y-0.5">
                    <Label htmlFor="notify-reports" className="text-gray-700">User Reports</Label>
                    <p className="text-sm text-gray-500">Get notified about reported content</p>
                  </div>
                  <Switch id="notify-reports" defaultChecked />
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-4 bg-amber-50 rounded-lg border border-amber-200/50">
                  <div className="space-y-0.5">
                    <Label htmlFor="notify-listings" className="text-gray-700">New Listings</Label>
                    <p className="text-sm text-gray-500">Get notified about new item listings</p>
                  </div>
                  <Switch id="notify-listings" />
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-4 bg-amber-50 rounded-lg border border-amber-200/50">
                  <div className="space-y-0.5">
                    <Label htmlFor="notify-transactions" className="text-gray-700">Transactions</Label>
                    <p className="text-sm text-gray-500">Get notified about new transactions</p>
                  </div>
                  <Switch id="notify-transactions" />
                </div>
              </CardContent>
              <CardFooter className="border-t border-gray-200/70 bg-gray-50 flex justify-end p-4">
                <Button className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 shadow-sm">
                  <Save className="h-4 w-4 mr-2" />
                  Save Notification Preferences
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="api">
            <Card className="border border-gray-200/70 shadow-sm overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200/70">
                <div className="flex items-center">
                  <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                    <Key className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle className="text-gray-800">API Configuration</CardTitle>
                    <CardDescription className="text-gray-600">Manage API keys and integration settings</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                <div className="space-y-2">
                  <Label htmlFor="api-key" className="text-gray-700">Admin API Key</Label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Input 
                      id="api-key" 
                      defaultValue="sk_admin_2023abcdef1234567890" 
                      className="sm:rounded-r-none border-gray-300 focus-visible:ring-gray-400"
                    />
                    <Button 
                      variant="outline" 
                      className="sm:rounded-l-none border-gray-300 hover:bg-gray-50 flex items-center"
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Regenerate
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500">Used for secure API access to administrative endpoints</p>
                </div>
                
                <div className="pt-4 border-t border-gray-200/70">
                  <h3 className="font-medium mb-4 text-gray-800">Third-Party Integrations</h3>
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-4 bg-purple-50 rounded-lg border border-purple-200/50">
                      <div className="flex">
                        <CreditCard className="h-5 w-5 text-purple-600 mr-3 flex-shrink-0 mt-0.5" />
                        <div className="space-y-0.5">
                          <Label htmlFor="payment-integration" className="text-gray-700">Payment Gateway</Label>
                          <p className="text-sm text-gray-500">Configure payment processing</p>
                        </div>
                      </div>
                      <Switch id="payment-integration" defaultChecked />
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-4 bg-purple-50 rounded-lg border border-purple-200/50">
                      <div className="flex">
                        <BarChart className="h-5 w-5 text-purple-600 mr-3 flex-shrink-0 mt-0.5" />
                        <div className="space-y-0.5">
                          <Label htmlFor="analytics-integration" className="text-gray-700">Analytics Integration</Label>
                          <p className="text-sm text-gray-500">Connect to analytics platform</p>
                        </div>
                      </div>
                      <Switch id="analytics-integration" defaultChecked />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t border-gray-200/70 bg-gray-50 flex justify-end p-4">
                <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 shadow-sm">
                  <Save className="h-4 w-4 mr-2" />
                  Save API Settings
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;