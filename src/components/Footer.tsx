import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export default function Footer() {
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Footer newsletter signup");
  };

  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-background" data-testid="footer-logo">
              VirtualOffice Hub
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your trusted partner for virtual office solutions in Orlando, Florida. 
              Compare local providers, explore Central Florida locations, and grow your business with confidence.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-background transition-colors" data-testid="link-facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-background transition-colors" data-testid="link-twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-background transition-colors" data-testid="link-linkedin">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-background transition-colors" data-testid="link-instagram">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-background">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/locations" className="text-gray-300 hover:text-background transition-colors" data-testid="link-locations">Locations</Link></li>
              <li><a href="#" className="text-gray-300 hover:text-background transition-colors" data-testid="link-providers">Providers</a></li>
              <li><a href="#" className="text-gray-300 hover:text-background transition-colors" data-testid="link-pricing">Pricing</a></li>
              <li><a href="#" className="text-gray-300 hover:text-background transition-colors" data-testid="link-resources">Resources</a></li>
              <li><a href="#" className="text-gray-300 hover:text-background transition-colors" data-testid="link-blog">Blog</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-background">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-300 hover:text-background transition-colors" data-testid="link-help-center">Help Center</a></li>
              <li><a href="#" className="text-gray-300 hover:text-background transition-colors" data-testid="link-contact">Contact Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-background transition-colors" data-testid="link-privacy">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-background transition-colors" data-testid="link-terms">Terms of Service</a></li>
              <li><a href="#" className="text-gray-300 hover:text-background transition-colors" data-testid="link-affiliate">Affiliate Disclosure</a></li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-background">Stay Connected</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center text-gray-300">
                <Mail className="w-4 h-4 mr-2" />
                <span>hello@virtualofficehub.com</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Phone className="w-4 h-4 mr-2" />
                <span>1-800-OFFICE-1</span>
              </div>
              <div className="flex items-start text-gray-300">
                <MapPin className="w-4 h-4 mr-2 mt-0.5" />
                <span>
                  123 Business Ave<br />
                  Suite 100<br />
                  New York, NY 10001
                </span>
              </div>
            </div>
            
            {/* Mini Newsletter */}
            <div className="pt-4">
              <p className="text-sm text-gray-300 mb-2">Get updates:</p>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 bg-gray-800 border-gray-600 text-background placeholder:text-gray-400"
                  data-testid="input-footer-newsletter"
                />
                <Button type="submit" size="sm" variant="secondary" data-testid="button-footer-newsletter">
                  Join
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>&copy; 2024 VirtualOffice Hub. All rights reserved.</p>
            <p className="mt-2 md:mt-0">
              Made with passion for entrepreneurs worldwide
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}