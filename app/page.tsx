import LandingLayout from '@/components/layout/LandingLayout';
import { fetcher } from '@/service/fetcher';
import FeaturedProjects from '@/app/FeaturedProjects';

export default async function page() {
  let featuredProjects: Project[] = [];

  try {
    featuredProjects = (await fetcher(
      '',
      {},
      'projects/featured'
    )) as unknown as Project[];
  } catch (e) {}

  return (
    <LandingLayout>
      <FeaturedProjects projects={featuredProjects} />
    </LandingLayout>
  );
}
