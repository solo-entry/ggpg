'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { FetchClient } from '@/service/fetch-client';
import { InputPassword } from '@/components/ui/input-password';

export default function ChangePasswordForm() {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const errors: string[] = [];

    if (!formData.currentPassword) {
      errors.push('Current password is required.');
    }

    if (formData.newPassword.length < 6) {
      errors.push('New password must be at least 6 characters.');
    }

    if (formData.newPassword !== formData.confirmPassword) {
      errors.push('New password and confirmation password do not match.');
    }

    if (errors.length > 0) {
      errors.forEach((error) =>
        toast({
          title: 'Validation Error',
          description: error,
          variant: 'destructive'
        })
      );
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      await FetchClient('auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword
        })
      });

      toast({
        title: 'Success',
        description: 'Password changed successfully.',
        variant: 'success'
      });

      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'An error occurred.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-2 lg:max-w-[500px]">
      <div>
        <Label htmlFor="currentPassword">Current Password</Label>
        <InputPassword
          id="currentPassword"
          name="currentPassword"
          placeholder="Enter current password"
          value={formData.currentPassword}
          onChange={(e) =>
            setFormData({ ...formData, currentPassword: e.target.value })
          }
        />
      </div>

      <div>
        <Label htmlFor="newPassword">New Password</Label>
        <InputPassword
          id="newPassword"
          name="newPassword"
          placeholder="Enter new password"
          value={formData.newPassword}
          onChange={(e) =>
            setFormData({ ...formData, newPassword: e.target.value })
          }
        />
      </div>

      <div>
        <Label htmlFor="confirmPassword">Confirm New Password</Label>
        <InputPassword
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm new password"
          value={formData.confirmPassword}
          onChange={(e) =>
            setFormData({ ...formData, confirmPassword: e.target.value })
          }
        />
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? 'Updating...' : 'Change Password'}
      </Button>
    </form>
  );
}
