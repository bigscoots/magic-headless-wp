import { useState, useEffect } from 'react';

export const useScrollProgress = () => {
  const [completion, setCompletion] = useState<number>(0);

  useEffect(() => {
    const updateScrollCompletion = () => {
      const currentScrollY = window.scrollY;
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      
      if (scrollHeight > 0) {
        const scrolled = Number((currentScrollY / scrollHeight).toFixed(2)) * 100;
        setCompletion(scrolled);
      }
    };

    // Update on mount
    updateScrollCompletion();

    // Update on scroll
    window.addEventListener('scroll', updateScrollCompletion);
    
    // Clean up
    return () => window.removeEventListener('scroll', updateScrollCompletion);
  }, []);

  return completion;
};