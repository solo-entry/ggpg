'use client';

import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { useRouter, useSearchParams } from 'next/navigation';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Trash2 } from 'lucide-react';
import { FetchClient } from '@/service/fetch-client';
import { ReloadIcon } from '@radix-ui/react-icons';

export default function ProjectForm() {
  const [generating, setGenerating] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    media: [] as string[],
    tags: [] as string[],
    category: undefined,
    author: undefined,
    driveFileId: ''
  });

  const [loading, setLoading] = useState(false);
  const [mediaInput, setMediaInput] = useState('');
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [author, setAuthor] = useState<Author[]>([]);
  const searchParam = useSearchParams();
  const dataId = searchParam.get('id');

  useEffect(() => {
    (async () => {
      try {
        const [categoriesData, authorsData] = await Promise.all([
          FetchClient('admin/categories', { method: 'GET' }),
          FetchClient('admin/users', { method: 'GET' })
        ]);
        setCategories(categoriesData);
        setAuthor(authorsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    })();
  }, []);

  const fetchData = async () => {
    const res = await FetchClient(`projects/${dataId}`, {
      method: 'GET'
    });
    setFormData((prev) => ({
      ...prev,
      title: res.title,
      description: res.description,
      category: res.category?._id,
      author: res.author?._id,
      media: res.media,
      tags: res.tags.join(', '),
      driveFileId: res.driveFileId ?? ''
    }));
  };
  useEffect(() => {
    if (dataId) {
      fetchData();
    }
  }, [dataId]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleCategoryChange = (value: any) => {
    if (value) {
      setFormData((prev) => ({
        ...prev,
        category: value
      }));
    }
  };
  const handleAuthorChange = (value: any) => {
    if (value) {
      setFormData((prev) => ({
        ...prev,
        author: value
      }));
    }
  };

  const handleAddMedia = () => {
    if (!mediaInput || !mediaInput.startsWith('http')) {
      toast({
        title: 'Error',
        description: 'Please enter a valid media URL.',
        variant: 'destructive'
      });
      return;
    }
    setFormData((prev) => ({
      ...prev,
      media: [...prev.media, mediaInput]
    }));
    setMediaInput('');
  };

  const handleRemoveMedia = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      media: prev.media.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const { title, description, category } = formData;
    if (!title) {
      toast({
        title: 'Error',
        description: 'Title is required.',
        variant: 'destructive'
      });
      return false;
    }

    if (!category) {
      toast({
        title: 'Error',
        description: 'Category is required.',
        variant: 'destructive'
      });
      return false;
    }

    if (!author) {
      toast({
        title: 'Error',
        description: 'Author is required.',
        variant: 'destructive'
      });
      return false;
    }

    if (!description) {
      toast({
        title: 'Error',
        description: 'Description is required.',
        variant: 'destructive'
      });
      return false;
    }

    return true;
  };

  const generateTags = async () => {
    setGenerating(true);
    try {
      if (!formData.title.trim() || !formData.description.trim()) {
        return toast({
          title: `Missing information`,
          description: 'Please fill the title and description fields',
          variant: 'destructive'
        });
      }
      const data = await FetchClient('projects/tags', {
        method: 'Post',
        body: JSON.stringify({
          title: formData.title,
          description: formData.description
        })
      });
      setFormData((prev) => ({
        ...prev,
        tags: data.data.join(', ')
      }));
    } finally {
      setGenerating(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      dataId
        ? await FetchClient(`projects/${dataId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
          })
        : await FetchClient('projects', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
          });
      toast({
        title: `Project ${dataId ? 'Edited' : 'Created'} successfully!`,
        description: 'Your project has been saved.',
        variant: 'success'
      });
      router.push('/dashboard/projects');
      router.refresh();
    } catch (error: any) {
      toast({
        title: 'Action failed',
        description: error.message || 'An error occurred.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="w-full space-y-2 lg:max-w-[500px]">
      {/* Title Field */}
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          placeholder="Enter the project title"
          value={formData.title}
          onChange={handleChange}
          disabled={loading}
        />
      </div>

      {/* Description Field */}
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Enter the project description"
          value={formData.description}
          onChange={handleChange}
          disabled={loading}
          className="w-full rounded-md border border-gray-300 p-2"
        />
      </div>
      <div>
        <Label htmlFor="tags">Tags</Label>
        <div className="flex items-center space-x-2">
          <Input
            id="tags"
            name="tags"
            placeholder="Tags for this project"
            value={formData.tags}
            onChange={handleChange}
          />
          <Button
            type="button"
            className={'w-52'}
            onClick={generateTags}
            disabled={loading || generating}
          >
            {generating && <ReloadIcon className={'mr-2 animate-spin'} />}
            {generating ? 'Generating' : 'Generate with A.I'}
          </Button>
        </div>
      </div>

      {/* Media URLs Field */}
      <div>
        <Label htmlFor="media">Media URLs</Label>
        <div className="flex items-center space-x-2">
          <Input
            id="media"
            name="media"
            placeholder="Enter a valid media URL"
            value={mediaInput}
            onChange={(e) => setMediaInput(e.target.value)}
            disabled={loading}
          />
          <Button type="button" onClick={handleAddMedia} disabled={loading}>
            Add
          </Button>
        </div>
        <ul className="mt-2 space-y-2">
          {formData.media.map((url, index) => (
            <li key={index} className="flex items-center justify-between">
              <a href={url} target="_blank" className="truncate">
                {url}
              </a>
              <Button
                type="button"
                variant="ghost"
                onClick={() => handleRemoveMedia(index)}
                disabled={loading}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <Label htmlFor="author">Author</Label>
        <Select onValueChange={handleAuthorChange} value={formData.author}>
          <SelectTrigger>
            <SelectValue placeholder="Select an author" />
          </SelectTrigger>
          <SelectContent>
            {author.map((item) => (
              <SelectItem value={item._id} key={item._id}>
                {item.fullName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Category Field */}
      <div>
        <Label htmlFor="category">Category</Label>
        <Select onValueChange={handleCategoryChange} value={formData.category}>
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((item) => (
              <SelectItem value={item._id} key={item._id}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* File ID */}
      <div>
        <Label htmlFor="driveFileId">
          Report Google Drive File ID (Optional)
        </Label>
        <Input
          id="driveFileId"
          name="driveFileId"
          placeholder="File ID"
          value={formData.driveFileId}
          onChange={handleChange}
          disabled={loading}
        />
      </div>

      {/* Submit Button */}
      <Button disabled={loading} type="submit" className="w-full">
        {dataId ? 'Edit' : 'Create'} Project
      </Button>
    </form>
  );
}
