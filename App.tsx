
import React, { useState, useEffect } from 'react';
import { Post, ViewMode, Profile } from './types';
import PostCard from './components/PostCard';
import AdminForm from './components/AdminForm';
import AboutSection from './components/AboutSection';
import ProfileEditor from './components/ProfileEditor';

const DEFAULT_PROFILE: Profile = {
  name: "আরিফুল ইসলাম",
  role: "কন্টেন্ট ক্রিয়েটর ও ডিজিটাল ডেভেলপার",
  description: "আমি ডিজিটাল কন্টেন্ট তৈরি করতে এবং নতুন প্রযুক্তি নিয়ে কাজ করতে ভালোবাসি। আমার এই পোর্টালে আপনি আমার নিয়মিত কাজের আপডেট, চিন্তা-ভাবনা এবং বিভিন্ন গুরুত্বপূর্ণ বিষয় জানতে পারবেন। নিচে আমার লেটেস্ট পোস্টগুলো দেখে নিন!",
  profileImageUrl: "",
  facebookUrl: "https://www.facebook.com/share/1BSDL6UDCG/",
  whatsappUrl: "",
  email: "ariful40807@gmail.com"
};

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [profile, setProfile] = useState<Profile>(DEFAULT_PROFILE);
  const [viewMode, setViewMode] = useState<ViewMode>('HOME');
  const [isAdminAuth, setIsAdminAuth] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [passkey, setPasskey] = useState('');

  useEffect(() => {
    // Load Posts
    const savedPosts = localStorage.getItem('site_posts');
    if (savedPosts) {
      try {
        setPosts(JSON.parse(savedPosts));
      } catch (e) {
        console.error("Failed to parse saved posts", e);
      }
    }

    // Load Profile
    const savedProfile = localStorage.getItem('site_profile');
    if (savedProfile) {
      try {
        setProfile(JSON.parse(savedProfile));
      } catch (e) {
        console.error("Failed to parse saved profile", e);
      }
    }
  }, []);

  const savePosts = (newPosts: Post[]) => {
    setPosts(newPosts);
    localStorage.setItem('site_posts', JSON.stringify(newPosts));
  };

  const updateProfile = (newProfile: Profile) => {
    setProfile(newProfile);
    localStorage.setItem('site_profile', JSON.stringify(newProfile));
  };

  const addPost = (post: Post) => {
    const updatedPosts = [post, ...posts];
    savePosts(updatedPosts);
    setViewMode('HOME');
  };

  const deletePost = (id: string) => {
    if (window.confirm("আপনি কি নিশ্চিত যে এই পোস্টটি মুছে ফেলতে চান?")) {
      const updatedPosts = posts.filter(p => p.id !== id);
      savePosts(updatedPosts);
    }
  };

  const handleAdminToggle = () => {
    if (isAdminAuth) {
      setViewMode(viewMode === 'HOME' ? 'ADMIN' : 'HOME');
    } else {
      setShowLogin(true);
    }
  };

  const handleLogout = () => {
    setIsAdminAuth(false);
    setViewMode('HOME');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passkey === 'Ari180665ful%') {
      setIsAdminAuth(true);
      setShowLogin(false);
      setViewMode('ADMIN');
      setPasskey('');
    } else {
      alert("সঠিক পাসকি লিখুন।");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 glass-effect border-b border-slate-200 px-4 py-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => setViewMode('HOME')}
          >
            <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-100 group-hover:scale-105 transition-transform">
              <i className="fas fa-layer-group text-white text-lg"></i>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600">
                {profile.name} এর পোর্টাল
              </h1>
              <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest">Digital Portfolio</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAdminAuth && (
              <button 
                onClick={handleLogout}
                className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                title="লগ-আউট"
              >
                <i className="fas fa-sign-out-alt"></i>
              </button>
            )}
            <button 
              onClick={handleAdminToggle}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                viewMode === 'ADMIN' 
                ? 'bg-slate-900 text-white shadow-xl shadow-slate-200' 
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 shadow-sm'
              }`}
            >
              <i className={isAdminAuth ? (viewMode === 'ADMIN' ? 'fas fa-home' : 'fas fa-cog') : 'fas fa-lock'}></i>
              <span className="hidden sm:inline">
                {viewMode === 'ADMIN' ? 'হোম দেখুন' : (isAdminAuth ? 'ড্যাশবোর্ড' : 'অ্যাডমিন')}
              </span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-6xl mx-auto w-full px-4 py-8 sm:px-8">
        {showLogin && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
            <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl animate-in fade-in zoom-in duration-300">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-shield-alt text-blue-600 text-2xl"></i>
                </div>
                <h2 className="text-2xl font-bold text-slate-900">অ্যাডমিন এক্সেস</h2>
                <p className="text-slate-500 text-sm mt-1">সুরক্ষার জন্য পাসকিটি লিখুন</p>
              </div>
              
              <form onSubmit={handleLogin} className="space-y-4">
                <input 
                  type="password" 
                  autoFocus
                  value={passkey}
                  onChange={(e) => setPasskey(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-center text-lg tracking-widest"
                />
                <button 
                  type="submit"
                  className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
                >
                  এক্সেস ভেরিফাই করুন
                </button>
                <button 
                  type="button"
                  onClick={() => setShowLogin(false)}
                  className="w-full py-2 text-slate-400 text-sm hover:text-slate-600"
                >
                  বাতিল করুন
                </button>
              </form>
            </div>
          </div>
        )}

        {viewMode === 'ADMIN' ? (
          <div className="animate-in slide-in-from-bottom-4 duration-500 space-y-12">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-extrabold text-slate-900">অ্যাডমিন ড্যাশবোর্ড</h2>
                <p className="text-slate-500">আপনার তথ্য এবং পোস্ট ম্যানেজ করুন।</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-12">
              <ProfileEditor currentProfile={profile} onUpdateProfile={updateProfile} />
              <AdminForm onAddPost={addPost} />
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in duration-700">
            {/* Home Specific Content */}
            <AboutSection profile={profile} />

            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-2xl font-bold text-slate-900">সাম্প্রতিক আপডেট</h2>
              <div className="h-[2px] flex-grow bg-slate-100"></div>
            </div>

            {posts.length === 0 ? (
              <div className="text-center py-24 bg-white rounded-[2rem] border border-dashed border-slate-300">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-newspaper text-slate-300 text-3xl"></i>
                </div>
                <h3 className="text-xl font-bold text-slate-900">এখনো কোনো পোস্ট নেই</h3>
                <p className="text-slate-500 max-w-xs mx-auto mt-2">
                  খুব শীঘ্রই নতুন আপডেট আসছে!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {posts.map((post) => (
                  <PostCard 
                    key={post.id} 
                    post={post} 
                    isAdmin={isAdminAuth} 
                    onDelete={deletePost}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="py-10 border-t border-slate-100 mt-auto bg-white">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
              <i className="fas fa-code text-white text-xs"></i>
            </div>
            <span className="font-bold text-slate-900">{profile.name}</span>
          </div>
          <p className="text-slate-400 text-sm">
            &copy; {new Date().getFullYear()} সকল স্বত্ব সংরক্ষিত।
          </p>
          <div className="flex gap-4">
            {profile.facebookUrl && (
              <a href={profile.facebookUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-colors">
                <i className="fab fa-facebook-f"></i>
              </a>
            )}
            {profile.whatsappUrl && (
              <a href={`https://wa.me/${profile.whatsappUrl}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-green-500 transition-colors">
                <i className="fab fa-whatsapp"></i>
              </a>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
