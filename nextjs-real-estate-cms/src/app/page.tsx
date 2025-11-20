import { client } from '@/sanity/client'
import { Property } from '@/types'
import SearchBox from '@/components/SearchBox'
import PropertyCard from '@/components/PropertyCard'
import Link from 'next/link'

const FEATURED_PROPERTIES_QUERY = `*[
  _type == "property"
  && featured == true
]|order(publishedAt desc)[0...6]{
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
  publishedAt
}`

export default async function HomePage() {
  const properties = await client.fetch<Property[]>(FEATURED_PROPERTIES_QUERY)

  return (
    <main>
{/* Hero Section */}
<section className="relative bg-blue-600 h-135 xl:h-180 lg:h-170 md:h-165 text-white  overflow-hidden flex items-center">
  
  {/* Background Image with Overlay */}
  <div 
    className="absolute inset-0 z-0"
    style={{
      backgroundImage: "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2075&q=80')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat"
    }}
  >
    {/* Dark overlay for text readability */}
    <div className="absolute inset-0 bg-linear-to-r from-blue-900/80 to-blue-800/80"></div>
  </div>

  {/* Content */}
  <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 w-full">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 md:mb-8 drop-shadow-2xl leading-tight">
        Find Your Dream Home
      </h1>
      <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-10 md:mb-12 text-blue-50 drop-shadow-lg max-w-2xl mx-auto">
        Discover the perfect property that matches your lifestyle
      </p>
      
      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        {/* Browse Properties (Primary) */}
  <Link
    href="/properties"
    className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-blue-600 font-semibold rounded-full hover:bg-blue-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 text-center"
  >
    Browse Properties
  </Link>

  {/* Learn More (Secondary) */}
  <Link
    href="/contact" // or "/about" or any route/section you want
    className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-blue-600 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 text-center"
  >
    Learn More
  </Link>
      </div>
    </div>
  </div>

  {/* Scroll indicator (optional) */}
  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce hidden sm:block">
    <svg 
      className="w-6 h-6 text-white opacity-75" 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M19 14l-7 7m0 0l-7-7m7 7V3"
      />
    </svg>
  </div>
</section>



      {/* Search Box */}
      <div className="container mx-auto px-4">
        <SearchBox />
      </div>

      {/* Featured Properties */}
      <section className="container mx-auto px-4 py-20">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-2">
              Featured Properties
            </h2>
            <p className="text-gray-600">
              Handpicked properties just for you
            </p>
          </div>
          <Link 
            href="/properties"
            className="text-blue-600 hover:text-blue-700 font-semibold flex items-center"
          >
            View All
            <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Why Choose Us
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Wide Selection
              </h3>
              <p className="text-gray-600">
                Access thousands of properties from trusted sellers and landlords
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Trusted Platform
              </h3>
              <p className="text-gray-600">
                Verified listings and secure transactions for your peace of mind
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Expert Support
              </h3>
              <p className="text-gray-600">
                Our team of professionals ready to assist you every step of the way
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
