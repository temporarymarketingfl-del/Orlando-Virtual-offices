import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HelpCircle, MapPin, DollarSign, Building, Phone, Mail, Users, FileText } from "lucide-react";

export default function OrlandoVirtualOfficeFAQ() {
  const faqCategories = [
    {
      title: "Getting Started in Orlando",
      icon: MapPin,
      questions: [
        {
          question: "What makes Orlando a good location for a virtual office?",
          answer: "Orlando offers several key advantages: no state income tax in Florida, strategic location for business travel, access to a diverse talent pool, lower operational costs compared to Miami or Tampa, and prestigious business addresses in growing districts like Lake Nona Medical City and Downtown Orlando."
        },
        {
          question: "Which Orlando business district is best for my industry?",
          answer: "Downtown Orlando is ideal for legal, financial, and corporate services. Lake Nona Medical City suits healthcare and technology companies. Dr. Phillips works well for hospitality and customer-facing businesses. Winter Park is perfect for boutique firms and creative agencies. Millenia is great for international businesses due to airport proximity."
        },
        {
          question: "Do I need to be physically present in Orlando to use a virtual office?",
          answer: "No, you don't need to be physically present. Virtual offices are designed for remote businesses. However, being occasionally present for meetings, networking events, or using business lounges can enhance your local business relationships."
        }
      ]
    },
    {
      title: "Pricing & Costs",
      icon: DollarSign,
      questions: [
        {
          question: "What's the average cost of a virtual office in Orlando?",
          answer: "Orlando virtual office prices typically range from $89-$629 per month. Basic packages start around $89-$149, premium packages cost $229-$349, and executive packages range from $459-$629. Costs vary by location, with Downtown and Winter Park commanding premium prices."
        },
        {
          question: "Are there any additional fees I should know about?",
          answer: "Common additional fees include setup fees ($25-$50), mail forwarding charges ($0.50-$1.50 per piece), meeting room usage beyond included hours ($25-$45/hour), phone answering overages, and parking fees at some locations. Always ask for a complete fee schedule."
        },
        {
          question: "Can I upgrade or downgrade my plan?",
          answer: "Most Orlando providers allow plan changes with 30 days notice. Upgrading is typically immediate, while downgrades may require completing your current billing cycle. Some providers offer seasonal adjustments for businesses with fluctuating needs."
        }
      ]
    },
    {
      title: "Services & Features",
      icon: Building,
      questions: [
        {
          question: "What's included in a basic Orlando virtual office package?",
          answer: "Basic packages typically include: business address for mail and marketing, mail receiving and notification, basic mail forwarding, business listing in building directory, and access to common areas. Phone answering and meeting rooms usually require higher-tier plans."
        },
        {
          question: "How does mail handling work?",
          answer: "Your mail is received at your Orlando business address, sorted by building staff, and you're notified via app or email. You can request mail forwarding, scanning, or pickup. Most providers offer same-day notification and next-day forwarding options."
        },
        {
          question: "Can I use the address for business registration in Florida?",
          answer: "Yes, all reputable Orlando virtual office providers offer addresses suitable for Florida business registration, including LLC and corporation filings. Confirm the address is commercial-zoned and that the provider allows business registration use."
        }
      ]
    },
    {
      title: "Meeting Rooms & Facilities",
      icon: Users,
      questions: [
        {
          question: "How do meeting room bookings work in Orlando locations?",
          answer: "Most providers offer online booking systems available 24/7. You can reserve rooms by the hour, half-day, or full day. Popular Orlando locations recommend booking 48-72 hours in advance, especially for Downtown and Lake Nona locations."
        },
        {
          question: "What meeting room amenities are typically included?",
          answer: "Orlando virtual office meeting rooms usually include: high-speed Wi-Fi, video conferencing equipment, whiteboards or smart boards, coffee/water service, reception support, and parking validation. Premium locations may offer catering coordination and technical support."
        },
        {
          question: "Are there networking opportunities with other virtual office clients?",
          answer: "Many Orlando providers host monthly networking events, business mixers, and educational seminars. Lake Nona and Downtown locations often have the most active business communities with regular events and collaboration opportunities."
        }
      ]
    },
    {
      title: "Phone & Communication",
      icon: Phone,
      questions: [
        {
          question: "How does the phone answering service work?",
          answer: "Professional receptionists answer calls using your company name, take messages, and forward urgent calls based on your preferences. Most Orlando providers offer bilingual English/Spanish service, which is valuable for Central Florida's diverse market."
        },
        {
          question: "Can I get a local Orlando phone number?",
          answer: "Yes, most providers offer local Orlando area codes (407, 321, 689) as part of their service. You can also port existing numbers or get toll-free numbers. Some providers offer multiple numbers for different departments or campaigns."
        },
        {
          question: "What happens to calls when I'm unavailable?",
          answer: "Calls can be forwarded to voicemail, your mobile phone, or email. Messages are typically delivered via email, text, or through a client portal. Some providers offer after-hours answering and holiday coverage."
        }
      ]
    },
    {
      title: "Legal & Compliance",
      icon: FileText,
      questions: [
        {
          question: "Is a virtual office address acceptable for Florida business licensing?",
          answer: "Yes, virtual office addresses are acceptable for most Florida business licenses and permits. However, certain regulated industries (like healthcare clinics) may require physical locations. Check with Orange County or Orlando licensing departments for industry-specific requirements."
        },
        {
          question: "Can I use my virtual office address for banking?",
          answer: "Most banks accept virtual office addresses for business accounts, especially established Orlando providers like Regus or WeWork. Some banks may require additional documentation or a brief explanation of your virtual office arrangement."
        },
        {
          question: "What about sales tax and business tax requirements?",
          answer: "Your virtual office address can be used for Florida sales tax registration and other business tax purposes. However, tax obligations depend on where your business activity occurs, not just your registered address. Consult a Florida tax professional for specific guidance."
        }
      ]
    }
  ];

  const quickAnswers = [
    { question: "Cheapest Orlando virtual office?", answer: "Starting at $89/month in MetroWest" },
    { question: "Most prestigious address?", answer: "Downtown Orange Avenue or Winter Park Avenue" },
    { question: "Best for tech companies?", answer: "Lake Nona Medical City" },
    { question: "Closest to airport?", answer: "Millenia district (5 minutes to OIA)" },
    { question: "Best networking opportunities?", answer: "Downtown Orlando and Lake Nona" }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="faq-title">
            Orlando Virtual Office FAQ
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto" data-testid="faq-description">
            Get answers to the most common questions about virtual offices in Orlando, Florida. 
            From pricing and location selection to legal requirements and service features.
          </p>
        </div>

        {/* Quick Answers */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-foreground mb-6 text-center">Quick Answers</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickAnswers.map((qa, index) => (
              <Card key={index} className="hover-elevate" data-testid={`quick-answer-${index}`}>
                <CardContent className="p-4">
                  <div className="text-sm font-medium text-foreground mb-2">{qa.question}</div>
                  <div className="text-sm text-muted-foreground">{qa.answer}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Detailed FAQ by Category */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {faqCategories.map((category, categoryIndex) => {
            const IconComponent = category.icon;
            return (
              <Card key={categoryIndex} className="hover-elevate" data-testid={`faq-category-${categoryIndex}`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-primary" aria-hidden="true" />
                    </div>
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="space-y-2">
                    {category.questions.map((qa, qaIndex) => (
                      <AccordionItem key={qaIndex} value={`item-${categoryIndex}-${qaIndex}`} className="border border-border rounded-lg px-4">
                        <AccordionTrigger className="text-left hover:no-underline" data-testid={`faq-question-${categoryIndex}-${qaIndex}`}>
                          <span className="text-sm font-medium">{qa.question}</span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="text-sm text-muted-foreground leading-relaxed pt-2" data-testid={`faq-answer-${categoryIndex}-${qaIndex}`}>
                            {qa.answer}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Still Have Questions */}
        <div className="mt-12">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <HelpCircle className="w-8 h-8 text-primary" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                Still Have Questions About Orlando Virtual Offices?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Our Orlando virtual office specialists are here to help. Get personalized answers 
                about locations, pricing, and services tailored to your specific business needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Card className="bg-background hover-elevate" data-testid="contact-phone">
                  <CardContent className="p-4 text-center">
                    <Phone className="w-5 h-5 text-primary mx-auto mb-2" aria-hidden="true" />
                    <div className="text-sm font-medium">Call Us</div>
                    <div className="text-sm text-muted-foreground">(407) 555-OFFICE</div>
                  </CardContent>
                </Card>
                <Card className="bg-background hover-elevate" data-testid="contact-email">
                  <CardContent className="p-4 text-center">
                    <Mail className="w-5 h-5 text-primary mx-auto mb-2" aria-hidden="true" />
                    <div className="text-sm font-medium">Email Us</div>
                    <div className="text-sm text-muted-foreground">orlando@virtualoffices.com</div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}