import { Badge } from '@/components/ui/badge';

export default function TagList({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-row gap-2">
      {tags.map((tag) => (
        <Badge variant="outline">{tag}</Badge>
      ))}
    </div>
  );
}
