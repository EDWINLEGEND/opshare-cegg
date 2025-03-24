import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

const AdminListings = () => {
  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Listing Management</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Item Listings</CardTitle>
            <CardDescription>Manage product listings across the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Admin listings management interface will be implemented here.</p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminListings; 