import BlogCard from '../BlogCard';
import officeImage from "@assets/generated_images/Coworking_space_interior_80761a04.png";

export default function BlogCardExample() {
  // todo: remove mock functionality
  return (
    <div className="max-w-sm">
      <BlogCard
        id="virtual-office-guide-2024"
        title="The Complete Guide to Virtual Offices in 2024"
        excerpt="Everything you need to know about virtual offices, from choosing the right provider to maximizing your business presence without a physical location."
        author="Sarah Johnson"
        publishDate="Dec 15, 2024"
        readTime="8 min read"
        category="Guides"
        image={officeImage.src}
        slug="/blog/virtual-office-guide-2024"
      />
    </div>
  );
}