import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

const AdminFinancials = () => {
  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Financial Management</h1>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Platform Financials</CardTitle>
            <CardDescription>Manage and monitor financial transactions across the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Financial management dashboard will be implemented here. Features will include:</p>
            <ul className="list-disc pl-5 mt-2">
              <li>Transaction overview</li>
              <li>Revenue and fee management</li>
              <li>Refund processing</li>
              <li>Financial reporting</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminFinancials; 