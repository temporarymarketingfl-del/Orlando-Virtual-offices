"use client";

import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

const providerTestimonials = [
  {
    quote:
      "Opus Virtual Offices transformed our business operations. Their professional staff and prime Orlando locations gave us instant credibility with clients.",
    name: "David Martinez",
    designation: "CEO at Tech Innovations Orlando",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=3540&auto=format&fit=crop",
  },
  {
    quote:
      "The flexibility Regus Orlando offers is unmatched. We scaled from one desk to a full team workspace seamlessly as our startup grew.",
    name: "Jennifer Lee",
    designation: "Founder at CloudStart Solutions",
    src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=3540&auto=format&fit=crop",
  },
  {
    quote:
      "DaVinci Virtual's mail handling and receptionist services make us look like a Fortune 500 company. Best investment we've made for our business.",
    name: "Robert Chen",
    designation: "Managing Partner at Chen & Associates",
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=3540&auto=format&fit=crop",
  },
  {
    quote:
      "Orlando Office Center's meeting rooms are always pristine and professional. Our clients are consistently impressed when we host presentations there.",
    name: "Michelle Anderson",
    designation: "Business Development Director at Global Ventures",
    src: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=3540&auto=format&fit=crop",
  },
  {
    quote:
      "Moving to a virtual office with one of Orlando's top providers cut our overhead by 60% while improving our professional image. Game changer!",
    name: "James Wilson",
    designation: "CFO at Digital Marketing Pro",
    src: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=3540&auto=format&fit=crop",
  },
];

export default function ProviderComparison() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          What Our Clients Say
        </h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto">
          Discover how Orlando's virtual office providers have helped businesses like yours 
          establish a professional presence and grow their operations in Central Florida.
        </p>
      </div>
      <AnimatedTestimonials testimonials={providerTestimonials} autoplay={true} />
    </section>
  );
}
