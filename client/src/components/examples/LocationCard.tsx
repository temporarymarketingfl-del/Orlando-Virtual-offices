import LocationCard from '../LocationCard';
import cityImage from "@assets/generated_images/Downtown_business_district_58542a85.png";

export default function LocationCardExample() {
  // todo: remove mock functionality
  return (
    <div className="max-w-sm">
      <LocationCard
        id="new-york-ny"
        cityName="New York"
        stateName="NY"
        image={cityImage}
        providerCount={45}
        averagePrice="$299"
        popularAreas={["Manhattan", "Brooklyn", "Queens"]}
        isHotspot={true}
      />
    </div>
  );
}