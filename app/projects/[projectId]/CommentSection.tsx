'use client';

import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { FetchClient } from '@/service/fetch-client';
import { toast } from '@/components/ui/use-toast';
import gravatar from 'gravatar';
import { useUserInfo } from '@/hooks/useLocalStorage';
import { socketService } from '@/service/socket';
import { Lock } from 'lucide-react';

interface CommentSectionProps {
  project: Project;
}

export default function CommentSection({ project }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentContent, setCommentContent] = useState<string>('');

  const user = useUserInfo();

  useEffect(() => {
    FetchClient(`comments/${project._id}`).then((response) => {
      setComments(response);
    });
  }, []);

  useEffect(() => {
    let remover: any = () => {};
    const listen = () => {
      const io = socketService.getIo();
      io.emit('comment', project._id);
      remover = socketService.on('newComment', (newComment) => {
        setComments((comments) => [newComment, ...comments]);
      });
    };
    if (!socketService.connected) {
      remover = socketService.on('connect', () => {
        listen();
      });
    } else listen();

    return () => {
      typeof remover === 'function' && remover();
    };
  }, []);

  function postComment() {
    FetchClient(`comments/${project._id}`, {
      method: 'POST',
      body: JSON.stringify({
        content: commentContent
      })
    }).then(() => {
      setCommentContent('');
      toast({
        title: 'Comment posted',
        description: 'Your comment has been posted',
        variant: 'success'
      });
    });
  }

  return (
    <div className={'rounded-lg border-2 border-neutral-200'}>
      <div className={'relative flex flex-row gap-2 border-b-2 p-4'}>
        {!user?.fullName && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black text-lg font-medium text-white opacity-30">
            <Lock size={24} />
            Log in to comment
          </div>
        )}
        <img
          className={'h-16 w-16 rounded-full'}
          src={gravatar.url(user?.email || '')}
        />
        <div className={'flex flex-1 flex-col items-end'}>
          <Textarea
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            placeholder={'What are you thought?'}
          />
          <Button
            variant={'default'}
            className={'mt-4 rounded-full'}
            onClick={postComment}
          >
            Post comment
          </Button>
        </div>
      </div>

      {comments?.length === 0 && (
        <div>
          <div className={'py-8 text-center text-neutral-500'}>
            No comments yet
          </div>
        </div>
      )}
      <div className={'divide-y'}>
        {comments?.map((comment) => (
          <div className={'flex flex-row gap-4 p-4'} key={comment._id}>
            <img
              className={'h-12 w-12 rounded-full'}
              src={gravatar.url(comment.author.email)}
            />
            <div className={'flex-1'}>
              <div className={'text-sm'}>
                <div className={'font-bold'}>{comment.author.fullName}</div>
                <div className={'text-neutral-500'}>
                  {dayjs(comment.createdAt).format('DD MMM, YYYY')}
                </div>
              </div>
              <div className={'text-sm'}>{comment.content}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
