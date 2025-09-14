import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, User, ArrowRight } from "lucide-react";

interface BlogCardProps {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  publishDate: string;
  readTime: string;
  category: string;
  image: string;
  slug: string;
}

export default function BlogCard({
  id,
  title,
  excerpt,
  author,
  publishDate,
  readTime,
  category,
  image,
  slug
}: BlogCardProps) {

  const handleReadMore = () => {
    console.log("Read more clicked for article:", id);
  };

  return (
    <Card className="hover-elevate h-full flex flex-col group" data-testid={`card-blog-${id}`}>
      <CardHeader className="p-0">
        <div className="relative">
          <img
            src={image}
            alt={title}
            className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
          />
          <Badge 
            className="absolute top-3 left-3 bg-primary text-primary-foreground" 
            data-testid={`badge-category-${id}`}
          >
            {category}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-1 p-6 flex flex-col">
        <div className="flex-1">
          <h3 
            className="text-xl font-semibold text-foreground mb-3 leading-tight line-clamp-2 group-hover:text-primary transition-colors cursor-pointer" 
            data-testid={`text-blog-title-${id}`}
            onClick={handleReadMore}
          >
            {title}
          </h3>
          
          <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3" data-testid={`text-blog-excerpt-${id}`}>
            {excerpt}
          </p>
        </div>

        {/* Article Meta */}
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <User className="w-3 h-3 mr-1" />
              <span data-testid={`text-author-${id}`}>{author}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              <span data-testid={`text-read-time-${id}`}>{readTime}</span>
            </div>
          </div>
          <span data-testid={`text-publish-date-${id}`}>{publishDate}</span>
        </div>

        {/* Read More Button */}
        <Button
          variant="outline"
          className="w-full group/button"
          onClick={handleReadMore}
          data-testid={`button-read-more-${id}`}
        >
          Read More
          <ArrowRight className="w-4 h-4 ml-2 group-hover/button:translate-x-1 transition-transform" />
        </Button>
      </CardContent>
    </Card>
  );
}