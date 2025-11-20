import { client } from '@/sanity/client'
import PropertyCard from '@/components/PropertyCard'
import { Property } from '@/types'

export default async function PropertiesPage({ searchParams }: { searchParams?: Record<string, string | string[]> }) {
  // Read directly as strings
  const type = typeof searchParams?.type === "string" ? searchParams.type : "";
  const location = typeof searchParams?.location === "string" ? searchParams.location : "";
  const minPrice = searchParams?.minPrice ? Number(searchParams.minPrice) : 0;
  const maxPrice = searchParams?.maxPrice ? Number(searchParams.maxPrice) : Infinity;

  // Build dynamic GROQ filter
  let filter = `_type == "property"`;
  if (type) filter += ` && propertyType == "${type}"`;
  if (location) filter += ` && location.city match "${location}"`;
  if (minPrice) filter += ` && price >= ${minPrice}`;
  if (maxPrice !== Infinity) filter += ` && price <= ${maxPrice}`;

  const PROPERTIES_QUERY = `*[${filter}]|order(publishedAt desc){
    _id, title, slug, price, propertyType, status, location, bedrooms, bathrooms, area, images, description, publishedAt
  }`;

  const properties = await client.fetch<Property[]>(PROPERTIES_QUERY);

  return (
    <main className="container mx-auto px-4 py-40">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((property) => (
          <PropertyCard key={property._id} property={property} />
        ))}
      </div>
      {properties.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No properties found. Try a different search.</p>
        </div>
      )}
    </main>
  );
}
