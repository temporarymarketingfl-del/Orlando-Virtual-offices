import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { BlogPostGrid } from '@/components/blog/BlogPostGrid';
import { ArrowLeft, FolderOpen, FileText } from 'lucide-react';
import { getCategoryBySlug, getPostsByCategory, mockCategories } from '@/data/blogData';

interface CategoryPageProps {
  params: { slug: string };
}

// Generate static metadata for each category
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = getCategoryBySlug(params.slug);
  
  if (!category) {
    return {
      title: 'Category Not Found | VirtualOffice Hub',
    };
  }

  const posts = getPostsByCategory(category.id);

  return {
    title: `${category.name} Articles | VirtualOffice Hub Blog`,
    description: category.description || `Browse all ${category.name} articles on VirtualOffice Hub. ${posts.length} articles available.`,
    openGraph: {
      title: `${category.name} - Virtual Office Articles`,
      description: category.description || `${posts.length} articles about ${category.name}`,
      type: 'website',
    },
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = getCategoryBySlug(params.slug);
  
  if (!category) {
    notFound();
  }

  const categoryPosts = getPostsByCategory(category.id);
  const otherCategories = mockCategories
    .filter(cat => cat.id !== category.id)
    .map(cat => ({
      ...cat,
      postCount: getPostsByCategory(cat.id).length
    }))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      {/* Back Navigation */}
      <div className="border-b bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/blog/categories">
            <Button variant="ghost" size="sm" className="gap-2" data-testid="button-back-to-categories">
              <ArrowLeft className="w-4 h-4" />
              Back to Categories
            </Button>
          </Link>
        </div>
      </div>

      {/* Category Header */}
      <section className="bg-gradient-to-br from-primary/5 to-primary/10 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              <div 
                className="w-16 h-16 rounded-lg flex items-center justify-center text-white text-2xl font-bold"
                style={{ backgroundColor: category.color || '#6366f1' }}
                data-testid={`category-icon-${category.slug}`}
              >
                <FolderOpen className="w-8 h-8" />
              </div>
              
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2" data-testid="category-title">
                  {category.name}
                </h1>
                <Badge variant="secondary" className="text-sm" data-testid="category-post-count">
                  {categoryPosts.length} {categoryPosts.length === 1 ? 'article' : 'articles'}
                </Badge>
              </div>
            </div>
            
            {category.description && (
              <p className="text-lg text-muted-foreground leading-relaxed" data-testid="category-description">
                {category.description}
              </p>
            )}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Category Stats */}
              <Card>
                <CardHeader>
                  <h3 className="font-semibold text-foreground">Category Stats</h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total Articles</span>
                    <span className="font-medium" data-testid="stats-total-posts">{categoryPosts.length}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total Views</span>
                    <span className="font-medium" data-testid="stats-total-views">
                      {categoryPosts.reduce((total, post) => total + (post.viewCount || 0), 0)}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Avg Reading Time</span>
                    <span className="font-medium" data-testid="stats-avg-reading-time">
                      {Math.round(categoryPosts.reduce((total, post) => total + (post.readingTime || 5), 0) / categoryPosts.length || 0)} min
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Other Categories */}
              {otherCategories.length > 0 && (
                <Card>
                  <CardHeader>
                    <h3 className="font-semibold text-foreground">Other Categories</h3>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {otherCategories.map((cat) => (
                      <Link key={cat.id} href={`/blog/categories/${cat.slug}`}>
                        <div className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors cursor-pointer" data-testid={`other-category-${cat.slug}`}>
                          <div 
                            className="w-8 h-8 rounded flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                            style={{ backgroundColor: cat.color || '#6366f1' }}
                          >
                            <FolderOpen className="w-4 h-4" />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm text-foreground truncate">{cat.name}</div>
                            <div className="text-xs text-muted-foreground">{cat.postCount} articles</div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </CardContent>
                </Card>
              )}

              {/* Browse All Categories */}
              <div className="text-center">
                <Link href="/blog/categories">
                  <Button variant="outline" size="sm" className="w-full" data-testid="button-all-categories">
                    Browse All Categories
                  </Button>
                </Link>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-foreground" data-testid="articles-section-title">
                  {category.name} Articles
                </h2>
                
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
              {categoryPosts.length > 0 ? (
                <BlogPostGrid 
                  posts={categoryPosts}
                  showExcerpts={true}
                />
              ) : (
                <div className="text-center py-12" data-testid="no-articles">
                  <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No Articles Yet</h3>
                  <p className="text-muted-foreground mb-6">
                    We haven't published any articles in this category yet. Check back soon for new content!
                  </p>
                  <Link href="/blog">
                    <Button variant="outline">Browse All Articles</Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Load More */}
            {categoryPosts.length > 9 && (
              <div className="text-center py-8">
                <Button variant="outline" size="lg" data-testid="button-load-more">
                  Load More Articles
                </Button>
              </div>
            )}

            {/* Related Categories */}
            {otherCategories.length > 0 && (
              <div className="mt-16 pt-8 border-t">
                <h3 className="text-xl font-semibold text-foreground mb-6">
                  Explore Related Topics
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {otherCategories.map((cat) => (
                    <Link key={cat.id} href={`/blog/categories/${cat.slug}`}>
                      <div className="p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer text-center" data-testid={`related-category-${cat.slug}`}>
                        <div 
                          className="w-10 h-10 rounded-lg mx-auto mb-3 flex items-center justify-center text-white font-bold"
                          style={{ backgroundColor: cat.color || '#6366f1' }}
                        >
                          <FolderOpen className="w-5 h-5" />
                        </div>
                        
                        <h4 className="font-medium text-foreground mb-1">{cat.name}</h4>
                        <div className="text-sm text-muted-foreground">
                          {cat.postCount} articles
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}