import { Metadata } from 'next';
import { BlogPostGrid } from '@/components/blog/BlogPostGrid';
import { BlogNavigation } from '@/components/blog/BlogNavigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog - Virtual Office Insights & Orlando Business Tips | Orlando Virtual Offices',
  description: 'Discover expert insights on virtual offices, remote work strategies, and Orlando business opportunities. Stay updated with the latest trends in flexible workspace solutions.',
  alternates: {
    canonical: 'https://orlandovirtualoffices.com/blog'
  },
  openGraph: {
    title: 'Virtual Office Blog - Expert Business Insights',
    description: 'Expert insights on virtual offices, remote work, and Orlando business opportunities from industry professionals.',
    type: 'website',
    url: 'https://orlandovirtualoffices.com/blog',
    siteName: 'Orlando Virtual Offices',
  },
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 to-primary/10 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4" data-testid="hero-title">
              Virtual Office Insights & Business Tips
            </h1>
            <p className="text-lg text-muted-foreground mb-8" data-testid="hero-description">
              Stay ahead with expert insights on virtual offices, remote work strategies, 
              and Orlando's thriving business landscape.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                placeholder="Search articles..."
                className="pl-10 pr-4"
                data-testid="search-input"
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-1">
            <div className="sticky top-8">
              <BlogNavigation />
            </div>
          </aside>

          {/* Blog Posts Grid */}
          <main className="lg:col-span-3">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-foreground" data-testid="section-title">
                  Latest Articles
                </h2>
                
                {/* Filter/Sort Options */}
                <div className="hidden md:flex items-center gap-3 text-sm">
                  <span className="text-muted-foreground">Sort by:</span>
                  <Button variant="ghost" size="sm" className="h-8 text-primary">
                    Latest
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8">
                    Popular
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8">
                    Trending
                  </Button>
                </div>
              </div>

              {/* Blog Posts Grid */}
              <BlogPostGrid 
                showExcerpts={true}
                className="mb-12"
              />
            </div>

            {/* Load More Section */}
            <div className="text-center py-8">
              <Button variant="outline" size="lg" data-testid="button-load-more">
                Load More Articles
              </Button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}