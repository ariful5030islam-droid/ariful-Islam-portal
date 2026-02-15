
import React from 'react';
import { Post } from '../types';

interface PostCardProps {
  post: Post;
  isAdmin?: boolean;
  onDelete?: (id: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, isAdmin, onDelete }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden transition-all hover:shadow-md group">
      <div className="relative h-48 sm:h-64 overflow-hidden">
        <img 
          src={post.imageUrl || 'https://picsum.photos/800/600'} 
          alt={post.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-slate-800 text-xs font-semibold rounded-full shadow-sm">
            {post.category}
          </span>
        </div>
        {isAdmin && (
          <button 
            onClick={() => onDelete?.(post.id)}
            className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow-lg"
            title="Delete Post"
          >
            <i className="fas fa-trash-alt"></i>
          </button>
        )}
      </div>
      <div className="p-6">
        <div className="text-xs text-slate-400 mb-2">{post.date}</div>
        <h3 className="text-xl font-bold text-slate-900 mb-2 leading-tight">
          {post.title}
        </h3>
        <p className="text-slate-600 text-sm line-clamp-3 leading-relaxed">
          {post.content}
        </p>
      </div>
    </div>
  );
};

export default PostCard;
