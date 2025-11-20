import { client } from '@/sanity/client'
import { Post } from '@/types'
import { urlFor } from '@/lib/sanity-image'
import Link from 'next/link'
import Image from 'next/image'

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc){
  _id,
  title,
  slug,
  mainImage,
  excerpt,
  publishedAt,
  author->{
    name,
    image
  }
}`

export default async function BlogPage() {
  // Ensure always fresh data—no cache!
  const posts = await client.fetch<Post[]>(
    POSTS_QUERY,
    {},
    { next: { revalidate: 0 } } // <-- Disables caching
  )

  return (
    <main className="container mx-auto px-4 py-40">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
        <p className="text-gray-600">
          Latest news and insights from the real estate world
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link key={post._id} href={`/blog/${post.slug.current}`}>
            <article className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition group">
              {post.mainImage && (
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={urlFor(post.mainImage).width(600).height(400).url()}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              )}

              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition">
                  {post.title}
                </h2>
                
                {post.excerpt && (
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                )}

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                  {post.author && <span>By {post.author.name}</span>}
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">
            No blog posts yet. Check back soon!
          </p>
        </div>
      )}
    </main>
  )
}
