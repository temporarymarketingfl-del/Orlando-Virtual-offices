import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye, Calendar, User } from "lucide-react";
import { BlogPost, Author, BlogCategory } from "@shared/schema";

interface BlogPostCardProps {
  post: BlogPost;
  author?: Author;
  category?: BlogCategory;
  showExcerpt?: boolean;
  className?: string;
}

export function BlogPostCard({ 
  post, 
  author, 
  category, 
  showExcerpt = true,
  className = "" 
}: BlogPostCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getAuthorInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const readTime = Math.ceil((post.content?.length || 0) / 200); // Rough reading time calculation

  return (
    <Card className={`hover-elevate transition-all duration-200 overflow-hidden ${className}`} data-testid={`card-blog-post-${post.slug}`}>
      {/* Featured Image */}
      {post.featuredImage && (
        <div className="aspect-video relative overflow-hidden">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
            data-testid={`img-featured-${post.slug}`}
          />
          {category && (
            <div className="absolute top-3 left-3">
              <Badge variant="secondary" className="bg-white/90 text-black hover:bg-white">
                {category.name}
              </Badge>
            </div>
          )}
          {typeof post.viewCount === 'number' && post.viewCount > 0 && (
            <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/60 text-white px-2 py-1 rounded text-sm">
              <Eye className="w-3 h-3" />
              <span>{post.viewCount}</span>
            </div>
          )}
        </div>
      )}

      <CardHeader className="pb-3">
        {/* Title */}
        <Link href={`/blog/${post.slug}`}>
          <h3 className="text-lg font-semibold line-clamp-2 hover:text-primary transition-colors cursor-pointer" data-testid={`title-${post.slug}`}>
            {post.title}
          </h3>
        </Link>

        {/* Meta Information */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-3">
            {/* Author */}
            {author && author.slug && (
              <Link href={`/blog/authors/${author.slug}`}>
                <div className="flex items-center gap-2 hover:text-foreground transition-colors cursor-pointer" data-testid={`author-link-${author.slug}`}>
                  <Avatar className="w-6 h-6">
                    <AvatarImage src={author.avatar || ''} alt={author.name} />
                    <AvatarFallback className="text-xs">{getAuthorInitials(author.name)}</AvatarFallback>
                  </Avatar>
                  <span>{author.name}</span>
                </div>
              </Link>
            )}

            {/* Publication Date */}
            {post.publishedAt && (
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span data-testid={`date-${post.slug}`}>{formatDate(post.publishedAt.toString())}</span>
              </div>
            )}
          </div>

          {/* Reading Time */}
          <div className="flex items-center gap-1 text-xs">
            <span>{readTime} min read</span>
          </div>
        </div>
      </CardHeader>

      {/* Excerpt */}
      {showExcerpt && post.excerpt && (
        <CardContent className="pt-0">
          <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed" data-testid={`excerpt-${post.slug}`}>
            {post.excerpt}
          </p>
        </CardContent>
      )}
    </Card>
  );
}