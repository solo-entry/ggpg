import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import dayjs from 'dayjs';
import ChangePasswordForm from '@/components/forms/change-password-form';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Change Password', link: '/dashboard/change-password' }
];

export default async function page() {
  return (
    <PageContainer scrollable={true}>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="flex items-start justify-between">
          <Heading
            title={`Change Password`}
            description={'Data updated at ' + dayjs().format('DD/MM/YYYY')}
          />
        </div>
        <Separator />
        <ChangePasswordForm />
      </div>
    </PageContainer>
  );
}
