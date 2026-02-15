
import React, { useState, useRef } from 'react';
import { Post } from '../types';
import { enhancePostContent } from '../services/geminiService';

interface AdminFormProps {
  onAddPost: (post: Post) => void;
}

const AdminForm: React.FC<AdminFormProps> = ({ onAddPost }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('সাধারণ');
  const [image, setImage] = useState<string | null>(null);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEnhance = async () => {
    if (!title || !content) {
      alert("অনুগ্রহ করে আগে একটি শিরোনাম এবং মূল লেখা লিখুন।");
      return;
    }
    setIsEnhancing(true);
    const enhanced = await enhancePostContent(title, content);
    setContent(enhanced);
    setIsEnhancing(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content || !image) {
      alert("সবগুলো ঘর পূরণ করুন এবং একটি ছবি আপলোড করুন।");
      return;
    }

    const newPost: Post = {
      id: Date.now().toString(),
      title,
      content,
      category,
      imageUrl: image,
      date: new Date().toLocaleDateString('bn-BD', { 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric' 
      })
    };

    onAddPost(newPost);
    setTitle('');
    setContent('');
    setImage(null);
    setCategory('সাধারণ');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 mb-8">
      <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
        <i className="fas fa-plus-circle text-blue-500"></i>
        নতুন পোস্ট তৈরি করুন
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">শিরোনাম</label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="পোস্টের শিরোনাম..."
                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">বিভাগ</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option>সাধারণ</option>
                <option>আপডেট</option>
                <option>খবর</option>
                <option>ইভেন্ট</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">ছবি আপলোড</label>
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
              />
            </div>
          </div>

          <div className="flex flex-col h-full">
            <label className="block text-sm font-medium text-slate-700 mb-1">মূল বিষয়বস্তু</label>
            <div className="relative flex-grow">
              <textarea 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="আপনার পোস্টটি এখানে লিখুন..."
                className="w-full h-full min-h-[150px] px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
                required
              />
              <button
                type="button"
                onClick={handleEnhance}
                disabled={isEnhancing}
                className="absolute bottom-3 right-3 flex items-center gap-2 px-3 py-1.5 bg-indigo-500 text-white text-xs font-medium rounded-lg hover:bg-indigo-600 transition-colors disabled:opacity-50"
              >
                {isEnhancing ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-magic"></i>}
                AI দিয়ে সাজান
              </button>
            </div>
          </div>
        </div>

        {image && (
          <div className="mt-4">
            <p className="text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">ছবির প্রিভিউ</p>
            <img src={image} alt="Preview" className="h-40 w-auto rounded-xl border border-slate-200 object-cover shadow-sm" />
          </div>
        )}

        <div className="flex justify-end pt-4">
          <button 
            type="submit"
            className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all hover:-translate-y-0.5"
          >
            পোস্ট পাবলিশ করুন
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminForm;
