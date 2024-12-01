interface SocialLinks {
  linkedin: string;
}

interface Profile {
  bio: string;
  skills: string[];
  socialLinks: SocialLinks;
}

interface Author {
  _id: string;
  fullName: string;
  email: string;
  role: string;
  profile: Profile;
  createdAt: string;
}

interface Comment {
  _id: string;
  content: string;
  author: Author;
  project: string;
  createdAt: string;
}

interface Category {
  _id: string;
  name: string;
  description: string;
}

interface Project {
  _id: string;
  title: string;
  description: string;
  media: string[];
  tags: string[];
  author: Author;
  likes: string[];
  bookmarks: string[];
  comments: Comment[];
  category: Category;
  isFeatured: boolean;
  visibility: string;
  viewCount: number;
  createdAt: string;
  liked?: boolean;
  driveFileId?: string;
}
