
import React from 'react';
import { Profile } from '../types';

interface AboutSectionProps {
  profile: Profile;
}

const AboutSection: React.FC<AboutSectionProps> = ({ profile }) => {
  return (
    <section className="mb-16 animate-in fade-in slide-in-from-top-8 duration-1000">
      <div className="relative overflow-hidden bg-white rounded-[2rem] p-8 md:p-12 shadow-2xl shadow-slate-200 border border-white">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-indigo-50 rounded-full blur-3xl opacity-50"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
          {/* Profile Image */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-white shadow-xl">
              <img 
                src={profile.profileImageUrl || "https://api.dicebear.com/7.x/avataaars/svg?seed=Ariful"} 
                alt={profile.name} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 text-center md:text-left">
            <div className="inline-block px-4 py-1.5 mb-4 bg-blue-50 text-blue-600 text-xs font-bold rounded-full uppercase tracking-widest">
              স্বাগতম আমার পোর্টালে
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 leading-tight">
              {profile.name}
            </h1>
            <p className="text-xl font-medium text-indigo-600 mb-6">
              {profile.role}
            </p>
            <p className="text-slate-600 text-lg leading-relaxed mb-8 max-w-2xl whitespace-pre-wrap">
              {profile.description}
            </p>

            {/* Social Links */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              {profile.facebookUrl && (
                <a href={profile.facebookUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-[#1877F2] text-white rounded-xl font-bold hover:brightness-110 transition-all hover:-translate-y-1 shadow-lg shadow-blue-100">
                  <i className="fab fa-facebook-f"></i>
                  ফেসবুক
                </a>
              )}
              {profile.whatsappUrl && (
                <a href={`https://wa.me/${profile.whatsappUrl}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white rounded-xl font-bold hover:brightness-110 transition-all hover:-translate-y-1 shadow-lg shadow-green-100">
                  <i className="fab fa-whatsapp"></i>
                  হোয়াটসঅ্যাপ
                </a>
              )}
              {profile.email && (
                <a href={`mailto:${profile.email}`} className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all hover:-translate-y-1 shadow-lg shadow-slate-200">
                  <i className="fas fa-envelope"></i>
                  ইমেইল
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
