import React, { Suspense } from 'react';
import PageContainer from '@/components/layout/page-container';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import ProjectForm from '@/components/forms/project-form';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Projects', link: '/dashboard/projects' },
  { title: 'Form', link: '#' }
];

export default async function page() {
  return (
    <PageContainer scrollable={true}>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="flex items-start justify-between">
          <Heading
            title={'Project Form'}
            description={'You can view, edit, create project here'}
          />
        </div>
        <Separator />
        <Suspense fallback={null}>
          <ProjectForm />
        </Suspense>
      </div>
    </PageContainer>
  );
}
