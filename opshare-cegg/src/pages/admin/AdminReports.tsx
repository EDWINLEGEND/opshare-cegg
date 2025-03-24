import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

const AdminReports = () => {
  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Reports & Analytics</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Platform Analytics</CardTitle>
            <CardDescription>View comprehensive reports and metrics about platform activity</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Analytics dashboard will be implemented here. Features will include:</p>
            <ul className="list-disc pl-5 mt-2">
              <li>User engagement metrics</li>
              <li>Transaction trends</li>
              <li>Sustainability impact reports</li>
              <li>System performance logs</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminReports; 