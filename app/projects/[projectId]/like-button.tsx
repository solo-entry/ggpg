'use client';

import React, { useEffect, useState } from 'react';
import { ThumbsUpIcon } from 'lucide-react';
import { FetchClient } from '@/service/fetch-client';
import { useRouter } from 'next/navigation';
import { useUserInfo } from '@/hooks/useLocalStorage';

export default function LikeButton({ project }: { project: Project }) {
  const user = useUserInfo();
  const [liked, setLiked] = useState(
    project?.likes.includes(user?._id) || false
  );
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLike = async () => {
    if (loading) return;
    if (!user?.fullName) return;
    setLoading(true);
    try {
      if (liked) {
        await FetchClient(`likes/${project._id}`, { method: 'DELETE' });
      } else {
        await FetchClient(`likes/${project._id}`, { method: 'POST' });
      }
      router.refresh();
      setLiked(!liked);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLiked(project?.likes.includes(user?._id) || false);
  }, [project?.likes, user?._id]);

  return (
    <div
      onClick={handleLike}
      className={`flex h-12 w-12 cursor-pointer items-center justify-center rounded-full ${
        liked ? 'bg-blue-500' : 'bg-black'
      } ${loading ? 'opacity-50' : 'opacity-100'}`}
    >
      <ThumbsUpIcon className="text-white" />
    </div>
  );
}
