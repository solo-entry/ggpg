import { User } from '@/types/auth';

interface Comment {
  _id: string;
  content: string;
  author: User;
  project: Project;
  createdAt: string;
}
