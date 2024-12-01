'use client';

import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { useRouter, useSearchParams } from 'next/navigation';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FetchClient } from '@/service/fetch-client';

export default function CategoryForm() {
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const searchParam = useSearchParams();
  const dataId = searchParam.get('id');
  const fetchData = async () => {
    if (dataId) {
      const res = await FetchClient(`admin/categories/${dataId}`, {
        method: 'GET'
      });
      setFormData({ description: res.description, name: res.name });
    }
  };
  useEffect(() => {
    fetchData();
  }, [dataId]);

  const validateForm = () => {
    const { name } = formData;

    if (!name) {
      toast({
        title: 'Error',
        description: 'Name is required.',
        variant: 'destructive'
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      dataId
        ? await FetchClient(`admin/categories/${dataId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
          })
        : await FetchClient('admin/categories', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
          });
      toast({
        title: `Category ${dataId ? 'Edited' : 'Created'} successfully!`,
        description: 'Your category has been saved.',
        variant: 'success'
      });
      router.replace('/dashboard/categories');
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
    <form onSubmit={handleSubmit} className="w-full space-y-4 lg:max-w-[500px]">
      {/* Name Field */}
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          placeholder="Enter the category name"
          value={formData.name}
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
          placeholder="Enter the category description"
          value={formData.description}
          onChange={handleChange}
          disabled={loading}
          className="w-full rounded-md border border-gray-300 p-2"
        />
      </div>

      {/* Submit Button */}
      <Button disabled={loading} type="submit" className="w-full">
        {dataId ? 'Edit' : 'Create'} Category
      </Button>
    </form>
  );
}
