'use client';
import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { Trash2 } from 'lucide-react';
import { FetchClient } from '@/service/fetch-client';

export default function UpdateUserInfoForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    bio: '',
    skills: [] as string[], // skills là mảng
    socialLinks: {} as Record<string, string>
  });

  const [newSocialLink, setNewSocialLink] = useState({ platform: '', url: '' });
  const [newSkill, setNewSkill] = useState('');
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const errors: string[] = [];

    if (formData.fullName.trim().length < 3) {
      errors.push('Full name must be at least 3 characters.');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.push('Invalid email address.');
    }

    for (const [platform, url] of Object.entries(formData.socialLinks)) {
      if (!platform || !url) {
        errors.push('Social link must include both platform and URL.');
      }

      const urlRegex =
        /^(https?:\/\/)?([\w.-]+)+\.[a-z]{2,6}(\.[a-z]{2,6})?\/?$/i;
      if (!urlRegex.test(url)) {
        errors.push(`Invalid URL for ${platform}.`);
      }
    }

    // Show errors
    if (errors.length > 0) {
      errors.forEach((error) => {
        toast({
          title: 'Validation Error',
          description: error,
          variant: 'destructive'
        });
      });
      return false;
    }

    return true;
  };

  useEffect(() => {
    (async () => {
      const res = await FetchClient('auth/profile', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      setFormData({
        email: res.email,
        fullName: res.fullName,
        skills: res.profile.skills,
        bio: res.profile.bio,
        socialLinks: res.profile?.socialLinks || {}
      });
    })();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      await FetchClient('auth/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      toast({
        title: 'Success',
        description: 'User information updated successfully.',
        variant: 'success'
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
        <Label htmlFor="fullName">Full Name</Label>
        <Input
          id="fullName"
          name="fullName"
          placeholder="Full name"
          value={formData.fullName}
          onChange={(e) =>
            setFormData({ ...formData, fullName: e.target.value })
          }
        />
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>

      <div>
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          name="bio"
          placeholder="Type your bio"
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="skills">Skills</Label>
        <div className="flex items-center space-x-2">
          <Input
            id="skills"
            placeholder="Add a new skill"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
          />
          <Button
            type="button"
            className="whitespace-nowrap"
            onClick={() => {
              const skillToAdd = newSkill.trim();
              if (skillToAdd && !formData.skills.includes(skillToAdd)) {
                setFormData({
                  ...formData,
                  skills: [...formData.skills, skillToAdd]
                });
                setNewSkill('');
              } else {
                toast({
                  title: 'Warning',
                  description: 'This skill is already added or invalid.',
                  variant: 'destructive'
                });
              }
            }}
          >
            Add Skill
          </Button>
        </div>
        <ul className="mt-2 space-y-1">
          {formData.skills.map((skill, index) => (
            <li key={index} className="flex items-center justify-between">
              {skill}
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() =>
                  setFormData({
                    ...formData,
                    skills: formData.skills.filter((_, i) => i !== index)
                  })
                }
              >
                <Trash2 size={16} />
              </Button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <Label>Social Links</Label>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Platform (e.g., GitHub)"
              value={newSocialLink.platform}
              onChange={(e) =>
                setNewSocialLink({ ...newSocialLink, platform: e.target.value })
              }
            />
            <Input
              placeholder="URL"
              value={newSocialLink.url}
              onChange={(e) =>
                setNewSocialLink({ ...newSocialLink, url: e.target.value })
              }
            />
            <Button
              type="button"
              className="whitespace-nowrap"
              onClick={() => {
                if (newSocialLink.platform && newSocialLink.url) {
                  setFormData({
                    ...formData,
                    socialLinks: {
                      ...formData.socialLinks,
                      [newSocialLink.platform]: newSocialLink.url
                    }
                  });
                  setNewSocialLink({ platform: '', url: '' });
                }
              }}
            >
              Add Link
            </Button>
          </div>
          <ul className="mt-2 space-y-1">
            {Object.entries(formData.socialLinks).map(([platform, url]) => (
              <li key={platform} className="flex items-center justify-between">
                <span>
                  {platform}: <a href={url}>{url}</a>
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    const updatedLinks = { ...formData.socialLinks };
                    delete updatedLinks[platform];
                    setFormData({ ...formData, socialLinks: updatedLinks });
                  }}
                >
                  <Trash2 size={16} />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? 'Updating...' : 'Update Information'}
      </Button>
    </form>
  );
}
