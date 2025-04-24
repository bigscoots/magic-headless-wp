import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User } from 'lucide-react';
import { Post } from '../../types';
import { Card, CardContent, CardFooter } from '../ui/Card';

interface PostCardProps {
  post: Post;
  className?: string;
}

const PostCard: React.FC<PostCardProps> = ({ post, className }) => {
  // Format date
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Get featured image URL from _embedded or fallback
  const featuredImageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url 
    || post.featured_image_url 
    || 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';

  // Get author name from _embedded
  const authorName = post._embedded?.['author']?.[0]?.name || 'Anonymous';

  // Strip HTML tags from excerpt
  const stripHtml = (html: string) => {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };
  
  const excerpt = stripHtml(post.excerpt.rendered).substring(0, 120) + '...';

  return (
    <Card 
      className={`h-full flex flex-col transition-all duration-300 hover:shadow-md ${className}`}
      hovered
    >
      <Link to={`/articles/${post.slug}`} className="block" state={{ postId: post.id }}>
        <div className="relative pb-[56.25%] overflow-hidden rounded-t-lg">
          <img 
            src={featuredImageUrl}
            alt={post.title.rendered}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      </Link>
      
      <CardContent className="flex flex-col flex-grow p-5">
        <Link 
          to={`/articles/${post.slug}`}
          state={{ postId: post.id }}
          className="text-xl font-semibold text-neutral-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors line-clamp-2 mb-2"
        >
          <span dangerouslySetInnerHTML={{ __html: post.title.rendered }}></span>
        </Link>
        
        <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4 flex-grow">
          {excerpt}
        </p>
      </CardContent>
      
      <CardFooter className="px-5 pb-5 pt-0 border-t border-neutral-200 dark:border-neutral-800 text-xs text-neutral-600 dark:text-neutral-400">
        <div className="flex items-center space-x-4">
          <span className="flex items-center">
            <Calendar size={14} className="mr-1.5" />
            {formattedDate}
          </span>
          <span className="flex items-center">
            <User size={14} className="mr-1.5" />
            {authorName}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCard;