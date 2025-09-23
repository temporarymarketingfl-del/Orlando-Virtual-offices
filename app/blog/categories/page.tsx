import { Metadata } from 'next';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, FolderOpen, FileText } from 'lucide-react';
import { mockCategories, getPostsByCategory } from '@/data/blogData';

export const metadata: Metadata = {
  title: 'Categories - Explore Topics | Orlando Virtual Offices Blog',
  description: 'Browse articles by category. Find content on virtual offices, remote work, Orlando business, legal guidance, and more.',
  openGraph: {
    title: 'Blog Categories - Virtual Office Topics',
    description: 'Explore our blog content organized by topics and categories.',
    type: 'website',
  },
};

export default function CategoriesPage() {
  // Get categories with post counts and sort by post count
  const categoriesWithPosts = mockCategories
    .map(category => ({
      ...category,
      postCount: getPostsByCategory(category.id).length
    }))
    .sort((a, b) => b.postCount - a.postCount);

  const totalPosts = categoriesWithPosts.reduce((total, cat) => total + cat.postCount, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 to-primary/10 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <FolderOpen className="w-8 h-8 text-primary" />
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground" data-testid="hero-title">
                Browse Categories
              </h1>
            </div>
            
            <p className="text-lg text-muted-foreground mb-8" data-testid="hero-description">
              Explore our content organized by topics. From virtual office guides to 
              Orlando business insights, find exactly what you're looking for.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                placeholder="Search categories..."
                className="pl-10 pr-4"
                data-testid="search-categories"
              />
              <Button 
                size="sm" 
                className="absolute right-1 top-1/2 transform -translate-y-1/2"
                data-testid="search-button"
              >
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-2" data-testid="section-title">
              All Categories
            </h2>
            <p className="text-muted-foreground">
              {categoriesWithPosts.length} categories with {totalPosts} total articles
            </p>
          </div>
          
          {/* Sort Options */}
          <div className="hidden md:flex items-center gap-3 text-sm">
            <span className="text-muted-foreground">Sort by:</span>
            <Button variant="ghost" size="sm" className="h-8 text-primary">
              Most Articles
            </Button>
            <Button variant="ghost" size="sm" className="h-8">
              Name
            </Button>
            <Button variant="ghost" size="sm" className="h-8">
              Recent
            </Button>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" data-testid="categories-grid">
          {categoriesWithPosts.map((category) => (
            <Link key={category.id} href={`/blog/categories/${category.slug}`}>
              <Card className="hover-elevate cursor-pointer transition-all duration-200 h-full" data-testid={`category-card-${category.slug}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-3">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl font-bold"
                      style={{ backgroundColor: category.color || '#6366f1' }}
                    >
                      <FolderOpen className="w-6 h-6" />
                    </div>
                    
                    <Badge variant="secondary" data-testid={`post-count-${category.slug}`}>
                      {category.postCount} {category.postCount === 1 ? 'article' : 'articles'}
                    </Badge>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-foreground hover:text-primary transition-colors" data-testid={`category-name-${category.slug}`}>
                    {category.name}
                  </h3>
                </CardHeader>

                <CardContent className="pt-0">
                  {category.description && (
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3" data-testid={`category-description-${category.slug}`}>
                      {category.description}
                    </p>
                  )}
                  
                  {category.postCount > 0 && (
                    <div className="mt-4 pt-3 border-t border-border">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <FileText className="w-3 h-3" />
                        <span>Latest articles available</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 pt-12 border-t">
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Content Overview
            </h3>
            <p className="text-muted-foreground">
              Our comprehensive library of virtual office and business content
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2" data-testid="stat-categories">
                {categoriesWithPosts.length}
              </div>
              <div className="text-muted-foreground">Categories</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2" data-testid="stat-total-articles">
                {totalPosts}
              </div>
              <div className="text-muted-foreground">Total Articles</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2" data-testid="stat-avg-articles">
                {Math.round(totalPosts / categoriesWithPosts.length)}
              </div>
              <div className="text-muted-foreground">Avg per Category</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2" data-testid="stat-active-categories">
                {categoriesWithPosts.filter(cat => cat.postCount > 0).length}
              </div>
              <div className="text-muted-foreground">Active Categories</div>
            </div>
          </div>
        </div>

        {/* Featured Categories */}
        <div className="mt-16">
          <h3 className="text-xl font-semibold text-foreground mb-6">
            Most Popular Categories
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categoriesWithPosts.slice(0, 4).map((category, index) => (
              <Link key={category.id} href={`/blog/categories/${category.slug}`}>
                <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer" data-testid={`featured-category-${index}`}>
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0"
                    style={{ backgroundColor: category.color || '#6366f1' }}
                  >
                    {index + 1}
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground mb-1">{category.name}</h4>
                    <div className="text-sm text-muted-foreground">
                      {category.postCount} articles
                    </div>
                  </div>
                  
                  <div className="text-xs text-muted-foreground">
                    View →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}