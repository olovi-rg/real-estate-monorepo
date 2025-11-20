'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SearchBox() {
  const router = useRouter()
  const [searchParams, setSearchParams] = useState({
    type: '',
    location: '',
    minPrice: '',
    maxPrice: '',
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    
    if (searchParams.type) params.append('type', searchParams.type)
    if (searchParams.location) params.append('location', searchParams.location)
    if (searchParams.minPrice) params.append('minPrice', searchParams.minPrice)
    if (searchParams.maxPrice) params.append('maxPrice', searchParams.maxPrice)
    
    router.push(`/properties?${params.toString()}`)
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 -mt-20 relative z-10 max-w-5xl mx-auto">
      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Property Type
          </label>
          <select
            value={searchParams.type}
            onChange={(e) => setSearchParams({ ...searchParams, type: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Types</option>
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
            <option value="villa">Villa</option>
            <option value="condo">Condo</option>
            <option value="land">Land</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <input
            type="text"
            value={searchParams.location}
            onChange={(e) => setSearchParams({ ...searchParams, location: e.target.value })}
            placeholder="City or State"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Min Price
          </label>
          <input
            type="number"
            value={searchParams.minPrice}
            onChange={(e) => setSearchParams({ ...searchParams, minPrice: e.target.value })}
            placeholder="$100,000"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Max Price
          </label>
          <input
            type="number"
            value={searchParams.maxPrice}
            onChange={(e) => setSearchParams({ ...searchParams, maxPrice: e.target.value })}
            placeholder="$500,000"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="md:col-span-4">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition font-semibold text-lg"
          >
            Search Properties
          </button>
        </div>
      </form>
    </div>
  )
}
