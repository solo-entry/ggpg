import { Badge } from '@/components/ui/badge';

export default function TagList({ tags }: { tags: string[] }) {
  const maxVisibleTags = 3;
  const visibleTags = tags.slice(0, maxVisibleTags);
  const remainingCount = tags.length - maxVisibleTags;

  return (
    <div className="flex flex-row gap-2">
      {visibleTags.map((tag, index) => (
        <Badge key={index} variant="outline">
          {tag}
        </Badge>
      ))}
      {remainingCount > 0 && (
        <Badge variant="outline">+{remainingCount} more</Badge>
      )}
    </div>
  );
}
