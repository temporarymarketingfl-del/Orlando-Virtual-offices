import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, CheckCircle } from "lucide-react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log("Newsletter signup:", email);
    setIsSubscribed(true);
    setIsLoading(false);
    setEmail("");
  };

  if (isSubscribed) {
    return (
      <Card className="bg-primary/5 border-primary/20" data-testid="newsletter-success">
        <CardContent className="p-8 text-center">
          <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Thank you for subscribing!
          </h3>
          <p className="text-muted-foreground">
            You'll receive our latest updates and exclusive deals via email.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <section className="py-16 bg-primary/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="bg-card border-card-border" data-testid="newsletter-signup">
          <CardContent className="p-8 lg:p-12">
            <div className="text-center">
              <Mail className="w-12 h-12 text-primary mx-auto mb-6" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4" data-testid="newsletter-title">
                Stay Updated with Virtual Office Trends
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto" data-testid="newsletter-description">
                Get exclusive access to new provider listings, special discounts, 
                and industry insights delivered straight to your inbox. Join thousands 
                of entrepreneurs who trust our recommendations.
              </p>

              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1"
                    data-testid="input-newsletter-email"
                  />
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="sm:px-8"
                    data-testid="button-newsletter-subscribe"
                  >
                    {isLoading ? "Subscribing..." : "Subscribe"}
                  </Button>
                </div>
              </form>

              <p className="text-sm text-muted-foreground mt-4">
                No spam, unsubscribe at any time. Read our{" "}
                <a href="#" className="text-primary hover:underline">
                  privacy policy
                </a>
                .
              </p>

              {/* Trust Indicators */}
              <div className="flex items-center justify-center space-x-8 mt-8 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-primary mr-2" />
                  <span>5,000+ subscribers</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-primary mr-2" />
                  <span>Weekly updates</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-primary mr-2" />
                  <span>Exclusive deals</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}