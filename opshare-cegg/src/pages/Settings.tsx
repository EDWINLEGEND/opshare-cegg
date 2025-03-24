import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import { useCreditStore } from '@/stores/useCreditStore';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  User, Settings as SettingsIcon, Bell, Eye, CreditCard, Shield, 
  Smartphone, Globe, Moon, Sun, LogOut, Trash2, Upload, Camera,
  Edit, Save, Lock, Mail, MapPin, Phone, Home, Briefcase, AlertTriangle
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

// Mock user data - replace with actual data from your user context
const mockUserData = {
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  phone: "+1 (555) 123-4567",
  address: "123 Main St, San Francisco, CA 94105",
  bio: "Sustainability enthusiast and DIY hobbyist. I love sharing tools and outdoor gear with my community.",
  occupation: "UX Designer",
  company: "GreenTech Solutions",
  joinDate: "January 2023",
  verificationStatus: "verified"
};

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useUser();
  const [activeTab, setActiveTab] = useState("profile");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAvatarDialogOpen, setIsAvatarDialogOpen] = useState(false);
  
  // Form states
  const [userData, setUserData] = useState(mockUserData);
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    rentalReminders: true,
    marketingEmails: false,
    communityUpdates: true,
    instantMessages: true
  });
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "registered",
    showEmail: false,
    showPhone: false,
    locationPrecision: "neighborhood",
    activityVisibility: true,
    allowRecommendations: true
  });
  const [paymentSettings, setPaymentSettings] = useState({
    defaultPaymentMethod: "creditCard",
    autoPayEnabled: true,
    receivePaymentNotifications: true,
    autoConvertCredits: false
  });
  const [accessibilitySettings, setAccessibilitySettings] = useState({
    theme: "system",
    fontSize: 16,
    reducedMotion: false,
    highContrast: false
  });
  const [advancedSettings, setAdvancedSettings] = useState({
    twoFactorEnabled: true,
    sessionTimeout: "30min",
    apiAccess: false,
    dataExport: false
  });
  
  // Handle form submission
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile updated",
      description: "Your profile information has been successfully updated.",
    });
  };
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  const handleDeleteAccount = () => {
    setIsDeleteDialogOpen(false);
    toast({
      title: "Account scheduled for deletion",
      description: "Your account will be deleted after the 30-day grace period.",
      variant: "destructive"
    });
    // In a real app, you would trigger the account deletion process here
  };
  
  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6 flex items-center">
          <SettingsIcon className="mr-2 h-6 w-6" />
          Account Settings
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-4 mb-6 mt-2">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={userData.avatar} alt={userData.name} />
                    <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{userData.name}</p>
                    <p className="text-sm text-gray-500">{userData.email}</p>
                  </div>
                </div>
                
                <nav className="space-y-1">
                  <Button 
                    variant={activeTab === "profile" ? "default" : "ghost"} 
                    className="w-full justify-start" 
                    onClick={() => setActiveTab("profile")}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Button>
                  <Button 
                    variant={activeTab === "account" ? "default" : "ghost"} 
                    className="w-full justify-start" 
                    onClick={() => setActiveTab("account")}
                  >
                    <SettingsIcon className="mr-2 h-4 w-4" />
                    Account
                  </Button>
                  <Button 
                    variant={activeTab === "notifications" ? "default" : "ghost"} 
                    className="w-full justify-start" 
                    onClick={() => setActiveTab("notifications")}
                  >
                    <Bell className="mr-2 h-4 w-4" />
                    Notifications
                  </Button>
                  <Button 
                    variant={activeTab === "privacy" ? "default" : "ghost"} 
                    className="w-full justify-start" 
                    onClick={() => setActiveTab("privacy")}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    Privacy
                  </Button>
                  <Button 
                    variant={activeTab === "payment" ? "default" : "ghost"} 
                    className="w-full justify-start" 
                    onClick={() => setActiveTab("payment")}
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Payment
                  </Button>
                  <Button 
                    variant={activeTab === "accessibility" ? "default" : "ghost"} 
                    className="w-full justify-start" 
                    onClick={() => setActiveTab("accessibility")}
                  >
                    <Moon className="mr-2 h-4 w-4" />
                    Appearance
                  </Button>
                  <Button 
                    variant={activeTab === "advanced" ? "default" : "ghost"} 
                    className="w-full justify-start" 
                    onClick={() => setActiveTab("advanced")}
                  >
                    <Shield className="mr-2 h-4 w-4" />
                    Advanced
                  </Button>
                </nav>
                
                <Separator className="my-4" />
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </CardContent>
            </Card>
          </div>
          
          {/* Mobile Tabs */}
          <div className="lg:hidden mb-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="more">More</TabsTrigger>
              </TabsList>
              
              <TabsContent value="more" className="space-y-4">
                <Card>
                  <CardContent className="p-4">
                    <nav className="space-y-2 py-4">
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start" 
                        onClick={() => setActiveTab("privacy")}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        Privacy
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start" 
                        onClick={() => setActiveTab("payment")}
                      >
                        <CreditCard className="mr-2 h-4 w-4" />
                        Payment
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start" 
                        onClick={() => setActiveTab("accessibility")}
                      >
                        <Moon className="mr-2 h-4 w-4" />
                        Appearance
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start" 
                        onClick={() => setActiveTab("advanced")}
                      >
                        <Shield className="mr-2 h-4 w-4" />
                        Advanced
                      </Button>
                      
                      <Separator className="my-2" />
                      
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start text-red-600 hover:text-red-700"
                        onClick={handleLogout}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                      </Button>
                    </nav>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {/* Profile Settings */}
            {activeTab === "profile" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <User className="mr-2 h-5 w-5" />
                      Profile Information
                    </CardTitle>
                    <CardDescription>
                      Update your personal information and how it appears to others
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleProfileUpdate}>
                      <div className="space-y-6">
                        {/* Profile Picture */}
                        <div className="flex flex-col items-center sm:flex-row sm:items-start gap-4">
                          <div className="relative">
                            <Avatar className="h-24 w-24">
                              <AvatarImage src={userData.avatar} alt={userData.name} />
                              <AvatarFallback className="text-2xl">{userData.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <Button 
                              type="button" 
                              size="icon" 
                              variant="secondary" 
                              className="absolute -bottom-2 -right-2 rounded-full"
                              onClick={() => setIsAvatarDialogOpen(true)}
                            >
                              <Camera className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <div className="flex-1">
                            <h3 className="text-lg font-medium mb-1">{userData.name}</h3>
                            <p className="text-sm text-gray-500 mb-3">Member since {userData.joinDate}</p>
                            
                            <div className="flex flex-wrap gap-2">
                              <Badge variant="outline" className="flex items-center">
                                <Shield className="mr-1 h-3 w-3" />
                                {userData.verificationStatus === "verified" ? "Verified Account" : "Unverified"}
                              </Badge>
                              
                              <Badge variant="outline" className="bg-green-50 border-green-200 text-green-700">
                                Eco Level 3
                              </Badge>
                            </div>
                          </div>
                        </div>
                        
                        <Separator />
                        
                        {/* Basic Info */}
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="name">Full Name</Label>
                              <Input 
                                id="name" 
                                value={userData.name} 
                                onChange={(e) => setUserData({...userData, name: e.target.value})}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="email">Email Address</Label>
                              <Input 
                                id="email" 
                                type="email" 
                                value={userData.email} 
                                onChange={(e) => setUserData({...userData, email: e.target.value})}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="phone">Phone Number</Label>
                              <Input 
                                id="phone" 
                                value={userData.phone} 
                                onChange={(e) => setUserData({...userData, phone: e.target.value})}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="address">Address</Label>
                              <Input 
                                id="address" 
                                value={userData.address} 
                                onChange={(e) => setUserData({...userData, address: e.target.value})}
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="bio">Bio</Label>
                            <textarea 
                              id="bio" 
                              className="w-full min-h-[100px] p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                              value={userData.bio} 
                              onChange={(e) => setUserData({...userData, bio: e.target.value})}
                            />
                            <p className="text-xs text-gray-500">
                              Brief description that will appear on your public profile
                            </p>
                          </div>
                        </div>
                        
                        <Separator />
                        
                        {/* Professional Info */}
                        <div className="space-y-4">
                          <h3 className="font-medium">Professional Information</h3>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="occupation">Occupation</Label>
                              <Input 
                                id="occupation" 
                                value={userData.occupation} 
                                onChange={(e) => setUserData({...userData, occupation: e.target.value})}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="company">Company / Organization</Label>
                              <Input 
                                id="company" 
                                value={userData.company} 
                                onChange={(e) => setUserData({...userData, company: e.target.value})}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6 flex justify-end">
                        <Button type="submit" className="flex items-center">
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>
            )}
            
            {/* Account Settings */}
            {activeTab === "account" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <SettingsIcon className="mr-2 h-5 w-5" />
                      Account Settings
                    </CardTitle>
                    <CardDescription>
                      Manage your account preferences and security settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Password Section */}
                    <div className="space-y-4">
                      <h3 className="font-medium flex items-center">
                        <Lock className="mr-2 h-4 w-4" />
                        Password & Security
                      </h3>
                      <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="current-password">Current Password</Label>
                          <Input id="current-password" type="password" placeholder="••••••••" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="new-password">New Password</Label>
                            <Input id="new-password" type="password" placeholder="••••••••" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="confirm-password">Confirm New Password</Label>
                            <Input id="confirm-password" type="password" placeholder="••••••••" />
                          </div>
                        </div>
                        <div>
                          <Button variant="outline">Change Password</Button>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    {/* Two-Factor Authentication */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium flex items-center">
                            <Shield className="mr-2 h-4 w-4" />
                            Two-Factor Authentication
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            Add an extra layer of security to your account
                          </p>
                        </div>
                        <Switch
                          checked={advancedSettings.twoFactorEnabled}
                          onCheckedChange={(checked) => 
                            setAdvancedSettings({...advancedSettings, twoFactorEnabled: checked})
                          }
                        />
                      </div>
                      
                      {advancedSettings.twoFactorEnabled && (
                        <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-medium mb-2">Two-Factor Methods</h4>
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <input type="radio" id="2fa-app" name="2fa-method" className="mr-2" checked />
                              <label htmlFor="2fa-app">Authenticator App</label>
                            </div>
                            <div className="flex items-center">
                              <input type="radio" id="2fa-sms" name="2fa-method" className="mr-2" />
                              <label htmlFor="2fa-sms">SMS Code</label>
                            </div>
                            <div className="flex items-center">
                              <input type="radio" id="2fa-email" name="2fa-method" className="mr-2" />
                              <label htmlFor="2fa-email">Email Code</label>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="mt-4">
                            Configure 2FA
                          </Button>
                        </div>
                      )}
                    </div>
                    
                    <Separator />
                    
                    {/* Connected Accounts */}
                    <div className="space-y-4">
                      <h3 className="font-medium flex items-center">
                        <Globe className="mr-2 h-4 w-4" />
                        Connected Accounts
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-3">G</div>
                            <div>
                              <p className="font-medium">Google</p>
                              <p className="text-sm text-gray-500">Not connected</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">Connect</Button>
                        </div>
                        
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mr-3">f</div>
                            <div>
                              <p className="font-medium">Facebook</p>
                              <p className="text-sm text-gray-500">Connected as Alex J.</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">Disconnect</Button>
                        </div>
                        
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-3">in</div>
                            <div>
                              <p className="font-medium">LinkedIn</p>
                              <p className="text-sm text-gray-500">Not connected</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">Connect</Button>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    {/* Account Management */}
                    <div className="space-y-4">
                      <h3 className="font-medium text-red-600 flex items-center">
                        <AlertTriangle className="mr-2 h-4 w-4" />
                        Account Management
                      </h3>
                      <div className="bg-red-50 p-4 rounded-lg">
                        <h4 className="font-medium text-red-700 mb-2">Delete Account</h4>
                        <p className="text-sm text-red-600 mb-4">
                          This action is permanent and cannot be undone. All your data will be erased.
                        </p>
                        <Button 
                          variant="destructive" 
                          onClick={() => setIsDeleteDialogOpen(true)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Account
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            
            {/* Notification Settings */}
            {activeTab === "notifications" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Bell className="mr-2 h-5 w-5" />
                      Notification Settings
                    </CardTitle>
                    <CardDescription>
                      Control how and when you receive notifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Email Notifications */}
                    <div className="space-y-4">
                      <h3 className="font-medium flex items-center">
                        <Mail className="mr-2 h-4 w-4" />
                        Email Notifications
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Email Notifications</p>
                            <p className="text-sm text-gray-500">
                              Receive email updates about your account activity
                            </p>
                          </div>
                          <Switch
                            checked={notificationSettings.emailNotifications}
                            onCheckedChange={(checked) => 
                              setNotificationSettings({...notificationSettings, emailNotifications: checked})
                            }
                          />
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Rental Reminders</p>
                            <p className="text-sm text-gray-500">
                              Get reminders about upcoming rentals and returns
                            </p>
                          </div>
                          <Switch
                            checked={notificationSettings.rentalReminders}
                            onCheckedChange={(checked) => 
                              setNotificationSettings({...notificationSettings, rentalReminders: checked})
                            }
                          />
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Marketing Emails</p>
                            <p className="text-sm text-gray-500">
                              Receive offers, promotions, and newsletter
                            </p>
                          </div>
                          <Switch
                            checked={notificationSettings.marketingEmails}
                            onCheckedChange={(checked) => 
                              setNotificationSettings({...notificationSettings, marketingEmails: checked})
                            }
                          />
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    {/* Push Notifications */}
                    <div className="space-y-4">
                      <h3 className="font-medium flex items-center">
                        <Smartphone className="mr-2 h-4 w-4" />
                        Push Notifications
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Push Notifications</p>
                            <p className="text-sm text-gray-500">
                              Receive notifications on your devices
                            </p>
                          </div>
                          <Switch
                            checked={notificationSettings.pushNotifications}
                            onCheckedChange={(checked) => 
                              setNotificationSettings({...notificationSettings, pushNotifications: checked})
                            }
                          />
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Instant Messages</p>
                            <p className="text-sm text-gray-500">
                              Get notified when you receive a new message
                            </p>
                          </div>
                          <Switch
                            checked={notificationSettings.instantMessages}
                            onCheckedChange={(checked) => 
                              setNotificationSettings({...notificationSettings, instantMessages: checked})
                            }
                          />
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Community Updates</p>
                            <p className="text-sm text-gray-500">
                              Notifications about community events and updates
                            </p>
                          </div>
                          <Switch
                            checked={notificationSettings.communityUpdates}
                            onCheckedChange={(checked) => 
                              setNotificationSettings({...notificationSettings, communityUpdates: checked})
                            }
                          />
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    {/* SMS Notifications */}
                    <div className="space-y-4">
                      <h3 className="font-medium flex items-center">
                        <Phone className="mr-2 h-4 w-4" />
                        SMS Notifications
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">SMS Notifications</p>
                            <p className="text-sm text-gray-500">
                              Receive text message updates about important activity
                            </p>
                          </div>
                          <Switch
                            checked={notificationSettings.smsNotifications}
                            onCheckedChange={(checked) => 
                              setNotificationSettings({...notificationSettings, smsNotifications: checked})
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button type="button">Save Notification Settings</Button>
                  </CardFooter>
                </Card>
              </div>
            )}
            
            {/* Privacy Settings */}
            {activeTab === "privacy" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Eye className="mr-2 h-5 w-5" />
                      Privacy Settings
                    </CardTitle>
                    <CardDescription>
                      Control who can see your information and how it's used
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Profile Privacy */}
                    <div className="space-y-4">
                      <h3 className="font-medium flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        Profile Privacy
                      </h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="profile-visibility">Profile Visibility</Label>
                          <Select 
                            value={privacySettings.profileVisibility}
                            onValueChange={(value) => 
                              setPrivacySettings({...privacySettings, profileVisibility: value})
                            }
                          >
                            <SelectTrigger id="profile-visibility">
                              <SelectValue placeholder="Select visibility" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="public">Public - Visible to everyone</SelectItem>
                              <SelectItem value="registered">Registered Users Only</SelectItem>
                              <SelectItem value="connections">Connections Only</SelectItem>
                              <SelectItem value="private">Private - Only visible to you</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Show Email Address</p>
                            <p className="text-sm text-gray-500">
                              Allow others to see your email address
                            </p>
                          </div>
                          <Switch
                            checked={privacySettings.showEmail}
                            onCheckedChange={(checked) => 
                              setPrivacySettings({...privacySettings, showEmail: checked})
                            }
                          />
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Show Phone Number</p>
                            <p className="text-sm text-gray-500">
                              Allow others to see your phone number
                            </p>
                          </div>
                          <Switch
                            checked={privacySettings.showPhone}
                            onCheckedChange={(checked) => 
                              setPrivacySettings({...privacySettings, showPhone: checked})
                            }
                          />
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    {/* Location Privacy */}
                    <div className="space-y-4">
                      <h3 className="font-medium flex items-center">
                        <MapPin className="mr-2 h-4 w-4" />
                        Location Privacy
                      </h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="location-precision">Location Precision</Label>
                          <Select 
                            value={privacySettings.locationPrecision}
                            onValueChange={(value) => 
                              setPrivacySettings({...privacySettings, locationPrecision: value})
                            }
                          >
                            <SelectTrigger id="location-precision">
                              <SelectValue placeholder="Select precision" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="exact">Exact Address</SelectItem>
                              <SelectItem value="street">Street Level</SelectItem>
                              <SelectItem value="neighborhood">Neighborhood Only</SelectItem>
                              <SelectItem value="city">City Only</SelectItem>
                            </SelectContent>
                          </Select>
                          <p className="text-xs text-gray-500 mt-1">
                            Control how precisely your location is shown to others
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    {/* Activity Privacy */}
                    <div className="space-y-4">
                      <h3 className="font-medium flex items-center">
                        <SettingsIcon className="mr-2 h-4 w-4" />
                        Activity & Data
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Show Activity Status</p>
                            <p className="text-sm text-gray-500">
                              Allow others to see when you're active on OpShare
                            </p>
                          </div>
                          <Switch
                            checked={privacySettings.activityVisibility}
                            onCheckedChange={(checked) => 
                              setPrivacySettings({...privacySettings, activityVisibility: checked})
                            }
                          />
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Personalized Recommendations</p>
                            <p className="text-sm text-gray-500">
                              Allow us to use your activity to provide better recommendations
                            </p>
                          </div>
                          <Switch
                            checked={privacySettings.allowRecommendations}
                            onCheckedChange={(checked) => 
                              setPrivacySettings({...privacySettings, allowRecommendations: checked})
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button type="button">Save Privacy Settings</Button>
                  </CardFooter>
                </Card>
              </div>
            )}
            
            {/* Payment Settings */}
            {activeTab === "payment" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CreditCard className="mr-2 h-5 w-5" />
                      Payment Settings
                    </CardTitle>
                    <CardDescription>
                      Manage your payment methods and preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Payment Methods */}
                    <div className="space-y-4">
                      <h3 className="font-medium flex items-center">
                        <CreditCard className="mr-2 h-4 w-4" />
                        Payment Methods
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-3">G</div>
                            <div>
                              <p className="font-medium">Google</p>
                              <p className="text-sm text-gray-500">Not connected</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">Connect</Button>
                        </div>
                        
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mr-3">f</div>
                            <div>
                              <p className="font-medium">Facebook</p>
                              <p className="text-sm text-gray-500">Connected as Alex J.</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">Disconnect</Button>
                        </div>
                        
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-3">in</div>
                            <div>
                              <p className="font-medium">LinkedIn</p>
                              <p className="text-sm text-gray-500">Not connected</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">Connect</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 