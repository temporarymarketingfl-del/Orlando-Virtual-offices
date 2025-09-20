import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MapPin, ExternalLink, FileText } from "lucide-react";
import { Author } from "@shared/schema";

interface AuthorCardProps {
  author: Author;
  postCount?: number;
  showBio?: boolean;
  className?: string;
}

export function AuthorCard({ 
  author, 
  postCount = 0, 
  showBio = true,
  className = "" 
}: AuthorCardProps) {
  const getAuthorInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <Card className={`hover-elevate transition-all duration-200 ${className}`} data-testid={`card-author-${author.slug}`}>
      <CardHeader className="text-center pb-3">
        {/* Author Avatar */}
        <div className="flex justify-center mb-3">
          <Avatar className="w-20 h-20">
            <AvatarImage src={author.avatar || ''} alt={author.name} />
            <AvatarFallback className="text-xl font-semibold">
              {getAuthorInitials(author.name)}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Author Name */}
        <Link href={`/blog/authors/${author.slug}`}>
          <h3 className="text-lg font-semibold hover:text-primary transition-colors cursor-pointer" data-testid={`name-${author.slug}`}>
            {author.name}
          </h3>
        </Link>

      </CardHeader>

      <CardContent className="pt-0 space-y-4">
        {/* Bio */}
        {showBio && author.bio && (
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3" data-testid={`bio-${author.slug}`}>
            {author.bio}
          </p>
        )}

        {/* Stats and Links */}
        <div className="flex items-center justify-between">
          {/* Post Count */}
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <FileText className="w-3 h-3" />
            <span data-testid={`post-count-${author.slug}`}>
              {postCount} {postCount === 1 ? 'post' : 'posts'}
            </span>
          </div>

          {/* Social Links */}
          {author.socialLinks && (
            <a 
              href={author.socialLinks}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors"
              data-testid={`social-link-${author.slug}`}
            >
              <span>Social</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>


        {/* View Profile Link */}
        <div className="pt-2 border-t border-border">
          <Link href={`/blog/authors/${author.slug}`}>
            <div className="text-center text-sm text-primary hover:text-primary/80 font-medium cursor-pointer transition-colors" data-testid={`view-profile-${author.slug}`}>
              View Profile
            </div>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}