import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("Orlando, FL");

  return (
    <header className="w-full bg-card border-b border-card-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 gap-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-xl font-semibold text-primary" data-testid="logo">
              VirtualOffice Hub
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex" data-testid="nav-desktop">
            <div className="flex items-center gap-6 lg:gap-8">
              <a href="#" className="text-foreground hover:text-primary transition-colors whitespace-nowrap" data-testid="link-locations">
                Locations
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors whitespace-nowrap" data-testid="link-providers">
                Providers
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors whitespace-nowrap" data-testid="link-blog">
                Resources
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors whitespace-nowrap" data-testid="link-pricing">
                Pricing
              </a>
            </div>
          </nav>

          {/* Flexible Space for Search */}
          <div className="hidden lg:flex items-center justify-end min-w-0 flex-1 h-10">
            <div className="flex items-center h-full">
              {/* Search Icon Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={`transition-all duration-300 ease-in-out h-10 ${
                  isSearchOpen ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
                }`}
                data-testid="button-open-search"
              >
                <Search className="w-5 h-5" />
              </Button>

              {/* Expandable Search Field Container */}
              <div className={`flex items-center h-10 overflow-hidden transition-all duration-300 ease-in-out ${
                isSearchOpen 
                  ? 'w-72 xl:w-80 opacity-100 ml-2' 
                  : 'w-0 opacity-0 ml-0'
              }`}>
                <div className="relative w-full h-full flex items-center">
                  <Search className={`absolute left-3 z-10 text-muted-foreground w-4 h-4 transition-opacity duration-200 ${
                    isSearchOpen ? 'opacity-100 delay-150' : 'opacity-0'
                  }`} />
                  <Input
                    type="search"
                    placeholder="Search Orlando areas or providers..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className={`pl-10 pr-10 w-full h-10 transition-all duration-300 ease-in-out ${
                      isSearchOpen ? 'border-primary shadow-sm' : 'border-transparent'
                    }`}
                    data-testid="input-search"
                    autoFocus={isSearchOpen}
                    onBlur={() => {
                      if (!searchValue) {
                        setTimeout(() => setIsSearchOpen(false), 150);
                      }
                    }}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`absolute right-1 h-8 w-8 transition-all duration-200 ${
                      isSearchOpen ? 'opacity-100 scale-100 delay-150' : 'opacity-0 scale-90 pointer-events-none'
                    }`}
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
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3 flex-shrink-0">
            <ThemeToggle />
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
                  placeholder="Search Orlando areas or providers..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
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