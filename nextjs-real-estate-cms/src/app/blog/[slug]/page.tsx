import { client } from "@/sanity/client";
import Image from "next/image";

const SINGLE_POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  mainImage {
    asset->{
      url
    },
    alt
  },
  excerpt,
  body,
  publishedAt,
  author->{
    name,
    image {
      asset->{
        url
      }
    }
  },
  slug
}`;

export default async function BlogPostPage({ params }: { params: { slug: string } } | { params: Promise<{ slug: string }> }) {
  // Works if params is a plain object or Promise
  const actualParams = await Promise.resolve(params);
  const slug = actualParams.slug;
  const post = await client.fetch(SINGLE_POST_QUERY, { slug });

  if (!post) {
    return (
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-4">404 - Blog Post Not Found</h1>
        <p>The blog post you’re looking for does not exist.</p>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-40">
      <article className="bg-white rounded-xl shadow-lg overflow-hidden mb-12">
        {/* Display main image if available */}
        {post.mainImage?.asset?.url && (
          <div className="relative w-full h-80 mb-8">
            <Image
              src={post.mainImage.asset.url}
              alt={post.mainImage.alt || post.title}
              fill
              className="object-cover rounded-t-xl"
              priority
            />
          </div>
        )}
        <div className="p-8">
          <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
          <div className="flex items-center gap-4 text-gray-500 mb-6">
            <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
            {post.author?.name && <span>· By {post.author.name}</span>}
            {/* Display author image if available */}
            {post.author?.image?.asset?.url && (
              <Image
                src={post.author.image.asset.url}
                alt={post.author.name}
                width={32}
                height={32}
                className="rounded-full ml-2"
              />
            )}
          </div>
          {post.excerpt && <p className="text-lg mb-6 text-gray-700">{post.excerpt}</p>}
          {/* Simple block content rendering */}
          {post.body && (
            <div className="prose prose-lg max-w-none">
              {Array.isArray(post.body)
                ? post.body.map((block: any, idx: number) =>
                    block.children?.map((child: any, cidx: number) => (
                      <p key={idx + "-" + cidx}>{child.text}</p>
                    ))
                  )
                : <p>{post.body}</p>
              }
            </div>
          )}
        </div>
      </article>
    </main>
  );
}
