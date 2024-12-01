import React, { Suspense } from 'react';
import PageContainer from '@/components/layout/page-container';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import UserRegisterForm from '@/components/forms/user-register-form';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Categories', link: '/dashboard/categories' },
  { title: 'Form', link: '#' }
];

export default async function page() {
  return (
    <PageContainer scrollable={true}>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="flex items-start justify-between">
          <Heading
            title={'Category Form'}
            description={'You can view, edit, create category here'}
          />
        </div>
        <Separator />
        <Suspense fallback={null}>
          <div className="w-full max-w-[500px]">
            <UserRegisterForm isAdmin={true} />
          </div>
        </Suspense>
      </div>
    </PageContainer>
  );
}
