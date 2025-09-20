import Link from "next/link";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Home, Users, FolderOpen, TrendingUp } from "lucide-react";
import { BlogCategory } from "@shared/schema";

interface CategoriesApiResponse {
  success: boolean;
  data: (BlogCategory & { postCount: number })[];
}

interface BlogNavigationProps {
  className?: string;
}

export function BlogNavigation({ className = "" }: BlogNavigationProps) {
  const pathname = usePathname();

  // Fetch categories with post counts
  const { data: categoriesData } = useQuery<CategoriesApiResponse>({
    queryKey: ['/api/blog/categories'],
  });

  const categories = categoriesData?.data || [];

  const isActiveRoute = (path: string) => {
    if (path === "/blog" && pathname === "/blog") return true;
    if (path !== "/blog" && pathname.startsWith(path)) return true;
    return false;
  };

  const navigationItems = [
    {
      href: "/blog",
      label: "All Posts",
      icon: Home,
      testId: "nav-all-posts"
    },
    {
      href: "/blog/authors", 
      label: "Authors",
      icon: Users,
      testId: "nav-authors"
    },
    {
      href: "/blog/categories",
      label: "Categories", 
      icon: TrendingUp,
      testId: "nav-categories"
    }
  ];

  return (
    <nav className={`space-y-6 ${className}`} data-testid="blog-navigation">
      {/* Main Navigation */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Navigate
        </h3>
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = isActiveRoute(item.href);
          
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                size="sm"
                className="w-full justify-start gap-2 font-normal"
                data-testid={item.testId}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Button>
            </Link>
          );
        })}
      </div>

      {/* Categories */}
      {categories.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Categories
          </h3>
          <ScrollArea className="h-60">
            <div className="space-y-1">
              {categories.map((category) => {
                if (!category.slug) return null;
                const isActive = pathname.includes(`/blog/categories/${category.slug}`);
                
                return (
                  <Link key={category.id} href={`/blog/categories/${category.slug}`}>
                    <div
                      className={`
                        flex items-center justify-between p-2 rounded-md text-sm cursor-pointer transition-colors
                        ${isActive 
                          ? 'bg-secondary text-secondary-foreground' 
                          : 'hover:bg-secondary/50'
                        }
                      `}
                      data-testid={`nav-category-${category.slug}`}
                    >
                      <div className="flex items-center gap-2">
                        <FolderOpen className="w-3 h-3" />
                        <span className="truncate">{category.name}</span>
                      </div>
                      {category.postCount > 0 && (
                        <Badge variant="secondary" className="text-xs ml-auto">
                          {category.postCount}
                        </Badge>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </ScrollArea>
        </div>
      )}

      {/* Quick Stats */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Quick Stats
        </h3>
        <div className="grid grid-cols-2 gap-2 text-center">
          <div className="p-2 bg-muted rounded-md">
            <div className="text-sm font-semibold" data-testid="stats-total-posts">
              {categories.reduce((sum, cat) => sum + cat.postCount, 0)}
            </div>
            <div className="text-xs text-muted-foreground">Posts</div>
          </div>
          <div className="p-2 bg-muted rounded-md">
            <div className="text-sm font-semibold" data-testid="stats-categories">
              {categories.length}
            </div>
            <div className="text-xs text-muted-foreground">Categories</div>
          </div>
        </div>
      </div>
    </nav>
  );
}