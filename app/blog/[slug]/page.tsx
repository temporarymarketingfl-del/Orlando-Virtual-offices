import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Calendar, Clock, Eye, ArrowLeft, Share2, BookOpen } from 'lucide-react';
import { getPostBySlug, getAuthorBySlug, getCategoryBySlug } from '@/data/blogData';
import { ViewCountIncrementer } from '@/components/blog/ViewCountIncrementer';

interface BlogPostPageProps {
  params: { slug: string };
}

// Generate static metadata for each post
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found | VirtualOffice Hub',
    };
  }

  return {
    title: `${post.title} | VirtualOffice Hub Blog`,
    description: post.metaDescription || post.excerpt || `Read about ${post.title} on our virtual office blog.`,
    openGraph: {
      title: post.title,
      description: post.excerpt || '',
      type: 'article',
      publishedTime: post.publishedAt?.toString(),
      images: post.featuredImage ? [{ url: post.featuredImage }] : [],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug);
  
  if (!post) {
    notFound();
  }

  // Get author and category details directly from mock data
  const { mockAuthors, mockCategories } = await import('@/data/blogData');
  const author = post.authorId ? mockAuthors.find(a => a.id === post.authorId) : null;
  const category = post.categoryId ? mockCategories.find(c => c.id === post.categoryId) : null;

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

  // View count will be incremented by the ViewCountIncrementer component

  return (
    <div className="min-h-screen bg-background">
      {/* Back Navigation */}
      <div className="border-b bg-card/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/blog">
            <Button variant="ghost" size="sm" className="gap-2" data-testid="button-back-to-blog">
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Article Header */}
        <header className="mb-8">
          {/* Category Badge */}
          {category && (
            <div className="mb-4">
              <Link href={`/blog/categories/${category.slug}`}>
                <Badge 
                  variant="secondary" 
                  className="hover:bg-secondary/80 cursor-pointer"
                  data-testid={`category-badge-${category.slug}`}
                >
                  {category.name}
                </Badge>
              </Link>
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-6 leading-tight" data-testid="post-title">
            {post.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            {/* Author & Date */}
            <div className="flex items-center gap-4">
              {author && (
                <Link href={`/blog/authors/${author.slug}`}>
                  <div className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer" data-testid={`author-link-${author.slug}`}>
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={author.avatar || ''} alt={author.name} />
                      <AvatarFallback>{getAuthorInitials(author.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-foreground">{author.name}</div>
                      {post.publishedAt && (
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(post.publishedAt.toString())}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              )}
            </div>

            {/* Stats & Actions */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              {post.readingTime && (
                <div className="flex items-center gap-1" data-testid="reading-time">
                  <Clock className="w-4 h-4" />
                  {post.readingTime} min read
                </div>
              )}
              
              {typeof post.viewCount === 'number' && post.viewCount > 0 && (
                <div className="flex items-center gap-1" data-testid="view-count">
                  <Eye className="w-4 h-4" />
                  {post.viewCount} views
                </div>
              )}

              <Button variant="outline" size="sm" className="gap-2" data-testid="button-share">
                <Share2 className="w-3 h-3" />
                Share
              </Button>
            </div>
          </div>

          {/* Featured Image */}
          {post.featuredImage && (
            <div className="aspect-video relative overflow-hidden rounded-lg mb-8" data-testid="featured-image">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="object-cover w-full h-full"
              />
            </div>
          )}

          {/* View Count Incrementer */}
          <ViewCountIncrementer slug={params.slug} />
        </header>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none mb-12" data-testid="post-content">
          {/* Excerpt */}
          {post.excerpt && (
            <div className="text-xl text-muted-foreground leading-relaxed mb-8 p-6 bg-muted/30 rounded-lg border-l-4 border-primary" data-testid="post-excerpt">
              {post.excerpt}
            </div>
          )}

          {/* Main Content */}
          <div className="text-foreground leading-relaxed space-y-6">
            {post.content?.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-base leading-7">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-8 pt-8 border-t">
              <div className="flex flex-wrap gap-2">
                <span className="text-sm font-medium text-muted-foreground mr-2">Tags:</span>
                {post.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Author Bio Section */}
        {author && (
          <>
            <Separator className="my-12" />
            
            <Card className="p-6" data-testid="author-bio-section">
              <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={author.avatar || ''} alt={author.name} />
                      <AvatarFallback className="text-lg">{getAuthorInitials(author.name)}</AvatarFallback>
                    </Avatar>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">About {author.name}</h3>
                    {author.bio && (
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                        {author.bio}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <Link href={`/blog/authors/${author.slug}`}>
                        <Button variant="outline" size="sm" className="gap-2" data-testid={`view-author-profile-${author.slug}`}>
                          <BookOpen className="w-3 h-3" />
                          View Profile
                        </Button>
                      </Link>
                      
                      {author.socialLinks && (
                        <a 
                          href={author.socialLinks}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:text-primary/80 transition-colors"
                          data-testid={`author-social-${author.slug}`}
                        >
                          Follow on Social
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Navigation */}
        <div className="mt-12 pt-8 border-t">
          <div className="flex justify-between">
            <Link href="/blog">
              <Button variant="outline" className="gap-2" data-testid="button-all-posts">
                <ArrowLeft className="w-4 h-4" />
                All Posts
              </Button>
            </Link>
            
            <Link href="/blog/authors">
              <Button variant="outline" className="gap-2" data-testid="button-all-authors">
                All Authors
                <BookOpen className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}