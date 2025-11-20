import { client } from '@/sanity/client'
import { Property } from '@/types'
import { urlFor } from '@/lib/sanity-image'
import Image from 'next/image'
import Link from 'next/link'

const PROPERTY_QUERY = `*[
  _type == "property"
  && slug.current == $slug
][0]{
  _id,
  title,
  slug,
  price,
  propertyType,
  status,
  location,
  bedrooms,
  bathrooms,
  area,
  images,
  description,
  features,
  publishedAt
}`

export default async function PropertyPage({ params }: { params: { slug: string } }) {
   // If params is a Promise
   const resolvedParams = await params;
   const slug = resolvedParams.slug;
 
   // Now use the slug in your query as usual
   const property = await client.fetch<Property>(PROPERTY_QUERY, { slug });
 

  if (!property) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Property Not Found</h1>
        <Link href="/properties" className="text-blue-600 hover:underline">
          Back to Properties
        </Link>
      </div>
    )
  }

  return (
    <main className="container mx-auto px-4 py-40">
      <Link href="/properties" className="text-blue-600 hover:underline mb-6 inline-block">
        ← Back to Properties
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Image Gallery */}
          <div className="mb-8">
            <div className="relative h-96 rounded-xl overflow-hidden mb-4">
              <Image
                src={urlFor(property.images[0]).width(1200).height(800).url()}
                alt={property.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {property.images.slice(1, 5).map((image, idx) => (
                <div key={idx} className="relative h-24 rounded-lg overflow-hidden">
                  <Image
                    src={urlFor(image).width(300).height(200).url()}
                    alt={`${property.title} ${idx + 2}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Property Details */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {property.title}
            </h1>

            <div className="flex items-center text-gray-600 mb-6">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              {property.location.address}, {property.location.city}, {property.location.state}
            </div>

            <div className="flex items-center gap-8 py-6 border-t border-b mb-6">
              {property.bedrooms && (
                <div>
                  <p className="text-gray-600 text-sm">Bedrooms</p>
                  <p className="text-2xl font-bold text-gray-900">{property.bedrooms}</p>
                </div>
              )}
              {property.bathrooms && (
                <div>
                  <p className="text-gray-600 text-sm">Bathrooms</p>
                  <p className="text-2xl font-bold text-gray-900">{property.bathrooms}</p>
                </div>
              )}
              {property.area && (
                <div>
                  <p className="text-gray-600 text-sm">Area</p>
                  <p className="text-2xl font-bold text-gray-900">{property.area} sq ft</p>
                </div>
              )}
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
              <p className="text-gray-700 leading-relaxed">{property.description}</p>
            </div>

            {property.features && property.features.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Features</h2>
                <ul className="grid grid-cols-2 gap-3">
                  {property.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-8 sticky top-24">
            <p className="text-3xl font-bold text-blue-600 mb-6">
              ${property.price.toLocaleString()}
            </p>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Property Type</span>
                <span className="font-semibold capitalize">{property.propertyType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status</span>
                <span className="font-semibold capitalize">
                  {property.status === 'sale' ? 'For Sale' : property.status === 'rent' ? 'For Rent' : 'Sold'}
                </span>
              </div>
            </div>

            <Link 
              href="/contact"
              className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Contact Agent
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
