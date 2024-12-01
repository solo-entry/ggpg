'use client';

import { useState } from 'react';
import { EyeOpenIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';

interface ProjectDocumentSectionProps {
  project: Project;
}

export default function ProjectDocumentSection({
  project
}: ProjectDocumentSectionProps) {
  const [showFile, setShowFile] = useState(false);

  return (
    <>
      {project.driveFileId && (
        <div className={'flex flex-row items-center gap-4 border-t p-4'}>
          <EyeOpenIcon />
          <div className={'flex-1'}>
            This project's author sharing their document for public sharing.
          </div>
          <Button
            className={'rounded-full'}
            variant={'outline'}
            onClick={() => {
              window.open(
                `https://drive.google.com/file/d/${project.driveFileId}/view?usp=sharing`,
                '_blank'
              );
            }}
          >
            Download
          </Button>
          <Button
            className={'rounded-full'}
            onClick={() => setShowFile(!showFile)}
          >
            {showFile ? 'Hide' : 'Show'}
          </Button>
        </div>
      )}

      {showFile && (
        <iframe
          src={`https://drive.google.com/file/d/${project.driveFileId}/preview`}
          width="100%"
          height="600px"
          allow="autoplay"
        ></iframe>
      )}
    </>
  );
}
