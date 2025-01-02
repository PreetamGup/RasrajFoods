
import PackageCard from '../components/shared/PackageCard';


const packages = [
  {
    name: 'Classic Celebration',
    price: 999,
    capacity: '50-100',
    features: [
      'Customized menu selection',
      'Basic decoration',
      'Dedicated service staff',
      '4-hour venue rental',
      'Basic sound system'
    ]
  },
  {
    name: 'Royal Feast',
    price: 1999,
    capacity: '100-200',
    features: [
      'Premium menu selection',
      'Elegant decoration',
      'Premium service staff',
      '6-hour venue rental',
      'Professional sound system',
      'Dance floor',
      'Valet parking'
    ]
  },
  {
    name: 'Maharaja Experience',
    price: 3999,
    capacity: '200-400',
    features: [
      'Luxury menu selection',
      'Premium decoration with flowers',
      'VIP service staff',
      '8-hour venue rental',
      'Professional sound & lighting',
      'Dance floor & stage',
      'Valet parking',
      'Event coordinator'
    ]
  }
];

export default function Banquets() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-playfair text-secondary mb-4">
            Banquet Packages
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto font-poppins">
            Create unforgettable memories with our carefully curated banquet packages.
            Perfect for weddings, corporate events, and special celebrations.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <PackageCard
              key={pkg.name}
              package={pkg}
              isPopular={index === 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}