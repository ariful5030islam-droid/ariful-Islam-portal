
import React, { useState, useRef } from 'react';
import { Profile } from '../types';

interface ProfileEditorProps {
  currentProfile: Profile;
  onUpdateProfile: (profile: Profile) => void;
}

const ProfileEditor: React.FC<ProfileEditorProps> = ({ currentProfile, onUpdateProfile }) => {
  const [profile, setProfile] = useState<Profile>(currentProfile);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({ ...prev, profileImageUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(profile);
    alert("প্রোফাইল সফলভাবে আপডেট করা হয়েছে!");
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 mb-8">
      <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
        <i className="fas fa-user-edit text-indigo-500"></i>
        আপনার প্রোফাইল আপডেট করুন
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Profile Image Upload */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-slate-100 shadow-inner bg-slate-50">
              <img 
                src={profile.profileImageUrl || "https://api.dicebear.com/7.x/avataaars/svg?seed=Ariful"} 
                alt="Preview" 
                className="w-full h-full object-cover"
              />
            </div>
            <button 
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-xs font-bold text-indigo-600 bg-indigo-50 px-4 py-2 rounded-full hover:bg-indigo-100 transition-colors"
            >
              ছবি পরিবর্তন করুন
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleImageChange}
            />
          </div>

          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">আপনার নাম</label>
              <input 
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">পদবী / রোল</label>
              <input 
                name="role"
                value={profile.role}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">নিজের সম্পর্কে</label>
              <textarea 
                name="description"
                value={profile.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                required
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-slate-100 pt-6">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">ফেসবুক লিঙ্ক</label>
            <input 
              name="facebookUrl"
              value={profile.facebookUrl}
              onChange={handleChange}
              placeholder="https://facebook.com/yourname"
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">হোয়াটসঅ্যাপ নম্বর</label>
            <input 
              name="whatsappUrl"
              value={profile.whatsappUrl}
              onChange={handleChange}
              placeholder="017xxxxxxxx"
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">ইমেইল ঠিকানা</label>
            <input 
              name="email"
              type="email"
              value={profile.email}
              onChange={handleChange}
              placeholder="example@gmail.com"
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 outline-none"
            />
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button 
            type="submit"
            className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all"
          >
            প্রোফাইল সেভ করুন
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileEditor;
