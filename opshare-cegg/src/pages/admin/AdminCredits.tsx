import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

const AdminCredits = () => {
  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Credit System Management</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>TreeCoin and Leaf Management</CardTitle>
            <CardDescription>Monitor and manage the platform's sustainability credit system</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Credit management dashboard will be implemented here. Features will include:</p>
            <ul className="list-disc pl-5 mt-2">
              <li>TreeCoin and Leaf transaction history</li>
              <li>Mission creation and management</li>
              <li>Credit rewards configuration</li>
              <li>Eco Score metrics and adjustments</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminCredits; 