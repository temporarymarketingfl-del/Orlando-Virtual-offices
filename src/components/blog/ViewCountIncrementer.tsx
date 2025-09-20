"use client";

import { useEffect } from 'react';

interface ViewCountIncrementerProps {
  slug: string;
}

export function ViewCountIncrementer({ slug }: ViewCountIncrementerProps) {
  useEffect(() => {
    // Increment view count when the component mounts (page loads)
    const incrementViewCount = async () => {
      try {
        await fetch(`/api/blog/posts/${slug}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'increment_view' }),
        });
      } catch (error) {
        // Silently fail - view count is not critical functionality
        console.debug('Failed to increment view count:', error);
      }
    };

    // Only increment once per page load with a small delay
    const timer = setTimeout(incrementViewCount, 1000);

    return () => clearTimeout(timer);
  }, [slug]);

  // This component doesn't render anything
  return null;
}