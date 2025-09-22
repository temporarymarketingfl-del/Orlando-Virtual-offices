import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { BlogPostGrid } from '@/components/blog/BlogPostGrid';
import { ArrowLeft, MapPin, ExternalLink, Calendar, FileText } from 'lucide-react';
import { getAuthorBySlug, getPostsByAuthor } from '@/data/blogData';

interface AuthorPageProps {
  params: { slug: string };
}

// Generate static metadata for each author
export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const author = getAuthorBySlug(params.slug);
  
  if (!author) {
    return {
      title: 'Author Not Found | VirtualOffice Hub',
    };
  }

  return {
    title: `${author.name} - Virtual Office Expert | VirtualOffice Hub`,
    description: author.bio || `Read articles by ${author.name}, a virtual office and business expert at VirtualOffice Hub.`,
    openGraph: {
      title: `${author.name} - Virtual Office Expert`,
      description: author.bio || `Articles and insights by ${author.name}`,
      type: 'profile',
      images: author.avatar ? [{ url: author.avatar }] : [],
    },
  };
}

export default function AuthorPage({ params }: AuthorPageProps) {
  const author = getAuthorBySlug(params.slug);
  
  if (!author) {
    notFound();
  }

  const authorPosts = getPostsByAuthor(author.id);
  
  const getAuthorInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const formatDate = (dateString: string | Date | null) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Back Navigation */}
      <div className="border-b bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/blog/authors">
            <Button variant="ghost" size="sm" className="gap-2" data-testid="button-back-to-authors">
              <ArrowLeft className="w-4 h-4" />
              Back to Authors
            </Button>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Author Profile Card */}
          <aside className="lg:col-span-1">
            <div className="sticky top-8">
              <Card className="mb-6" data-testid={`author-profile-${author.slug}`}>
                <CardHeader className="text-center pb-4">
                  {/* Author Avatar */}
                  <div className="flex justify-center mb-4">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src={author.avatar || ''} alt={author.name} />
                      <AvatarFallback className="text-2xl font-semibold">
                        {getAuthorInitials(author.name)}
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  {/* Author Name */}
                  <h1 className="text-2xl font-bold text-foreground mb-2" data-testid="author-name">
                    {author.name}
                  </h1>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Bio */}
                  {author.bio && (
                    <div>
                      <h3 className="font-medium text-foreground mb-2">About</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed" data-testid="author-bio">
                        {author.bio}
                      </p>
                    </div>
                  )}

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 py-4 border-t border-b">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary" data-testid={`post-count-${author.slug}`}>
                        {authorPosts.length}
                      </div>
                      <div className="text-xs text-muted-foreground">Articles</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">
                        {authorPosts.reduce((total, post) => total + (post.viewCount || 0), 0)}
                      </div>
                      <div className="text-xs text-muted-foreground">Total Views</div>
                    </div>
                  </div>

                  {/* Member Since */}
                  {author.createdAt && (
                    <div>
                      <h3 className="font-medium text-foreground mb-2">Member Since</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {formatDate(author.createdAt)}
                      </div>
                    </div>
                  )}

                  {/* Social Links */}
                  {author.socialLinks && (
                    <div>
                      <h3 className="font-medium text-foreground mb-2">Connect</h3>
                      <a 
                        href={author.socialLinks}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
                        data-testid={`social-link-${author.slug}`}
                      >
                        <ExternalLink className="w-4 h-4" />
                        Social Profile
                      </a>
                    </div>
                  )}

                  {/* Contact */}
                  {author.email && (
                    <div>
                      <h3 className="font-medium text-foreground mb-2">Contact</h3>
                      <a 
                        href={`mailto:${author.email}`}
                        className="text-sm text-primary hover:text-primary/80 transition-colors"
                        data-testid={`email-link-${author.slug}`}
                      >
                        {author.email}
                      </a>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <h3 className="font-semibold text-foreground">Recent Activity</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {authorPosts.slice(0, 3).map((post, index) => (
                      <div key={post.id} className="text-sm">
                        <Link href={`/blog/${post.slug}`}>
                          <div className="text-foreground hover:text-primary transition-colors cursor-pointer line-clamp-2 mb-1" data-testid={`recent-post-${index}`}>
                            {post.title}
                          </div>
                        </Link>
                        <div className="text-xs text-muted-foreground">
                          {post.publishedAt && formatDate(post.publishedAt)}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </aside>

          {/* Author's Articles */}
          <main className="lg:col-span-3">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-semibold text-foreground mb-2" data-testid="articles-section-title">
                    Articles by {author.name}
                  </h2>
                  <p className="text-muted-foreground">
                    {authorPosts.length} {authorPosts.length === 1 ? 'article' : 'articles'} published
                  </p>
                </div>
                
                {/* Sort Options */}
                <div className="hidden md:flex items-center gap-3 text-sm">
                  <span className="text-muted-foreground">Sort by:</span>
                  <Button variant="ghost" size="sm" className="h-8 text-primary">
                    Latest
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8">
                    Popular
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8">
                    Oldest
                  </Button>
                </div>
              </div>

              {/* Articles Grid */}
              {authorPosts.length > 0 ? (
                <BlogPostGrid 
                  posts={authorPosts}
                  showExcerpts={true}
                />
              ) : (
                <div className="text-center py-12" data-testid="no-articles">
                  <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No Articles Yet</h3>
                  <p className="text-muted-foreground">
                    {author.name} hasn't published any articles yet. Check back soon!
                  </p>
                </div>
              )}
            </div>

            {/* Load More */}
            {authorPosts.length > 6 && (
              <div className="text-center py-8">
                <Button variant="outline" size="lg" data-testid="button-load-more">
                  Load More Articles
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}