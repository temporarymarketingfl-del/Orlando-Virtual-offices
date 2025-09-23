import { Metadata } from 'next';
import { AuthorCard } from '@/components/blog/AuthorCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Users } from 'lucide-react';
import { mockAuthors, getPostsByAuthor } from '@/data/blogData';

export const metadata: Metadata = {
  title: 'Authors - Meet Our Virtual Office Experts | Orlando Virtual Offices',
  description: 'Meet our team of virtual office and remote work experts. Get insights from business consultants, attorneys, and industry professionals.',
  openGraph: {
    title: 'Virtual Office Experts & Authors',
    description: 'Meet our team of virtual office and remote work experts sharing their knowledge and experience.',
    type: 'website',
  },
};

export default function AuthorsPage() {
  // Get active authors with their post counts
  const activeAuthors = mockAuthors
    .filter(author => author.isActive)
    .map(author => ({
      ...author,
      postCount: getPostsByAuthor(author.id).length
    }))
    .sort((a, b) => b.postCount - a.postCount); // Sort by post count

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 to-primary/10 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Users className="w-8 h-8 text-primary" />
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground" data-testid="hero-title">
                Our Authors & Experts
              </h1>
            </div>
            
            <p className="text-lg text-muted-foreground mb-8" data-testid="hero-description">
              Meet the industry professionals sharing their expertise on virtual offices, 
              remote work, and Orlando's business landscape.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                placeholder="Search authors..."
                className="pl-10 pr-4"
                data-testid="search-authors"
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

      {/* Authors Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-2" data-testid="section-title">
              Featured Authors
            </h2>
            <p className="text-muted-foreground">
              {activeAuthors.length} expert contributors sharing their knowledge
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

        {/* Authors Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" data-testid="authors-grid">
          {activeAuthors.map((author) => (
            <AuthorCard
              key={author.id}
              author={author}
              postCount={author.postCount}
              showBio={true}
            />
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 pt-12 border-t">
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Our Community
            </h3>
            <p className="text-muted-foreground">
              Learn from industry experts with diverse backgrounds
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2" data-testid="stat-authors">
                {activeAuthors.length}
              </div>
              <div className="text-muted-foreground">Expert Authors</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2" data-testid="stat-articles">
                {activeAuthors.reduce((total, author) => total + author.postCount, 0)}
              </div>
              <div className="text-muted-foreground">Published Articles</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2" data-testid="stat-expertise">
                15+
              </div>
              <div className="text-muted-foreground">Years Combined Experience</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-muted/30 rounded-lg p-8">
          <h3 className="text-xl font-semibold text-foreground mb-4">
            Want to Contribute?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Are you a virtual office expert or business professional? 
            We're always looking for knowledgeable contributors to share insights with our community.
          </p>
          <Button size="lg" data-testid="button-become-author">
            Become an Author
          </Button>
        </div>
      </div>
    </div>
  );
}