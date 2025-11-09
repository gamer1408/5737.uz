import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/hooks/useAuth';
import { Settings as SettingsIcon, User, Bell, Globe, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/components/ui/sonner';

export default function Settings() {
  const { user, isSignedIn, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.profile?.firstName || '',
    lastName: user?.profile?.lastName || '',
    email: user?.email || '',
    phone: user?.profile?.phone || '',
    notifications: user?.preferences?.notifications || true,
    language: user?.preferences?.language || 'uz'
  });

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Sozlamalar</h1>
            <p>Sozlamalarni o'zgartirish uchun tizimga kiring</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleSave = async () => {
    setLoading(true);
    try {
      const result = await updateUser({
        profile: {
          ...user?.profile,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone
        },
        preferences: {
          ...user?.preferences,
          notifications: formData.notifications,
          language: formData.language
        }
      });

      if (result.success) {
        toast.success('Sozlamalar saqlandi!');
      } else {
        toast.error(result.error || 'Xatolik yuz berdi');
      }
    } catch (error) {
      toast.error('Xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <SettingsIcon className="w-6 h-6" />
            <h1 className="text-2xl font-bold">Sozlamalar</h1>
          </div>

          <div className="space-y-6">
            {/* Profile Settings */}
            <div className="border rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <User className="w-5 h-5" />
                <h2 className="text-lg font-semibold">Profil ma'lumotlari</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Ism</label>
                  <Input
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    placeholder="Ismingizni kiriting"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Familiya</label>
                  <Input
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    placeholder="Familiyangizni kiriting"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    value={formData.email}
                    disabled
                    className="bg-muted"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Email o'zgartirib bo'lmaydi</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Telefon</label>
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="Telefon raqamingizni kiriting"
                  />
                </div>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="border rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Bell className="w-5 h-5" />
                <h2 className="text-lg font-semibold">Bildirishnomalar</h2>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email bildirishnomalar</p>
                  <p className="text-sm text-muted-foreground">Yangi mahsulotlar va takliflar haqida xabar olish</p>
                </div>
                <Switch
                  checked={formData.notifications}
                  onCheckedChange={(checked) => setFormData({...formData, notifications: checked})}
                />
              </div>
            </div>

            {/* Language Settings */}
            <div className="border rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Globe className="w-5 h-5" />
                <h2 className="text-lg font-semibold">Til sozlamalari</h2>
              </div>
              <div>
                <label className="text-sm font-medium">Interfeys tili</label>
                <select
                  value={formData.language}
                  onChange={(e) => setFormData({...formData, language: e.target.value})}
                  className="w-full mt-1 p-2 border rounded-md"
                >
                  <option value="uz">O'zbekcha</option>
                  <option value="ru">Русский</option>
                  <option value="en">English</option>
                </select>
              </div>
            </div>

            {/* Save Button */}
            <Button onClick={handleSave} disabled={loading} className="w-full">
              <Save className="w-4 h-4 mr-2" />
              {loading ? 'Saqlanmoqda...' : 'Sozlamalarni saqlash'}
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}