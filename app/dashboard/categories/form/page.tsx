import React, { Suspense } from 'react';
import PageContainer from '@/components/layout/page-container';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import CategoryForm from '@/components/forms/category-form';

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
          <CategoryForm />
        </Suspense>
      </div>
    </PageContainer>
  );
}
