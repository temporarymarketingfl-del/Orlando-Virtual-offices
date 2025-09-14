import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Menu, X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  return (
    <header className="w-full bg-card border-b border-card-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-xl font-semibold text-primary" data-testid="logo">
              VirtualOffice Hub
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block" data-testid="nav-desktop">
            <div className="flex items-center space-x-8">
              <a href="#" className="text-foreground hover:text-primary transition-colors" data-testid="link-locations">
                Locations
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors" data-testid="link-providers">
                Providers
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors" data-testid="link-blog">
                Resources
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors" data-testid="link-pricing">
                Pricing
              </a>
            </div>
          </nav>

          {/* Expandable Search */}
          <div className="hidden lg:flex items-center flex-1 justify-end">
            {isSearchOpen ? (
              <div className="flex items-center w-full max-w-md mx-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    type="search"
                    placeholder="Search locations or providers..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="pl-10 pr-10 w-full"
                    data-testid="input-search"
                    autoFocus
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchValue("");
                    }}
                    data-testid="button-close-search"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(true)}
                className="mr-4"
                data-testid="button-open-search"
              >
                <Search className="w-5 h-5" />
              </Button>
            )}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" data-testid="button-signin">
              Sign In
            </Button>
            <Button data-testid="button-getstarted">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-card-border" data-testid="nav-mobile">
            <div className="flex flex-col space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  type="search"
                  placeholder="Search locations or providers..."
                  className="pl-10 w-full"
                  data-testid="input-search-mobile"
                />
              </div>
              
              {/* Mobile Navigation Links */}
              <a href="#" className="text-foreground hover:text-primary transition-colors py-2" data-testid="link-locations-mobile">
                Locations
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors py-2" data-testid="link-providers-mobile">
                Providers
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors py-2" data-testid="link-blog-mobile">
                Resources
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors py-2" data-testid="link-pricing-mobile">
                Pricing
              </a>
              
              {/* Mobile CTA Buttons */}
              <div className="flex flex-col space-y-2 pt-4">
                <Button variant="ghost" className="w-full" data-testid="button-signin-mobile">
                  Sign In
                </Button>
                <Button className="w-full" data-testid="button-getstarted-mobile">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}