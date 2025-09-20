import ProviderCard from '../ProviderCard';
import officeImage from "@assets/generated_images/Coworking_space_interior_80761a04.png";

export default function ProviderCardExample() {
  // todo: remove mock functionality
  return (
    <div className="max-w-sm">
      <ProviderCard
        id="regus-manhattan"
        name="Regus Manhattan"
        image={officeImage}
        rating={4.5}
        reviewCount={127}
        location="Manhattan, NY"
        priceRange="$199 - $899/month"
        services={["Virtual Office", "Meeting Rooms", "Mail Service", "Phone Answering"]}
        description="Professional virtual office solutions in the heart of Manhattan with prestigious business addresses and full-service support."
        isPopular={true}
        affiliateUrl="https://example.com/regus"
      />
    </div>
  );
}