import { Metadata } from "next";
import Layout from "../../../components/layout/Layout";
import StoriesClient from "../../stories/StoriesClient";
import StorySidebar from "../../../components/layout/StorySidebar";
import Link from "next/link";

const API_URL =
  process.env.API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost/api";

async function fetchGenreBySlug(slug: string) {
  try {
    const res = await fetch(`${API_URL}/stories/genres`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    const genres = data?.genres || data?.data || [];
    return genres.find(
      (g: any) => g.slug === slug || g.name.toLowerCase().replace(/\s+/g, "-") === slug
    );
  } catch {
    return null;
  }
}

async function fetchStoriesByGenre(slug: string, searchParams: { [key: string]: string | string[] | undefined }) {
  try {
    const params = new URLSearchParams();
    params.set("page", (searchParams.page as string) || "1");
    params.set("limit", "10");
    params.set("genre", slug);
    if (searchParams.sort) params.set("sort", searchParams.sort as string);

    const res = await fetch(`${API_URL}/stories?${params}`, { next: { revalidate: 60 } });
    if (!res.ok) return { stories: [], pagination: null };
    const data = await res.json();
    return {
      stories: data?.data?.data || data?.data || [],
      pagination: data?.data?.pagination || data?.pagination || null,
    };
  } catch {
    return { stories: [], pagination: null };
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const genre = await fetchGenreBySlug(params.slug);
  const genreName = genre?.name || params.slug;

  return {
    title: `Thể loại ${genreName} – Đọc truyện ${genreName} online miễn phí`,
    description: `Khám phá kho truyện thể loại ${genreName} hay nhất. Đọc truyện chữ và nghe truyện audio ${genreName} miễn phí tại Vivu Truyện Hay.`,
    openGraph: {
      title: `Thể loại ${genreName} – Vivu Truyện Hay`,
      description: `Kho truyện ${genreName} hay nhất, cập nhật liên tục.`,
      type: "website",
      locale: "vi_VN",
    },
    alternates: {
      canonical: `/the-loai/${params.slug}`,
    },
  };
}

export default async function GenrePage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const [genre, { stories, pagination }] = await Promise.all([
    fetchGenreBySlug(params.slug),
    fetchStoriesByGenre(params.slug, searchParams),
  ]);

  const genreName = genre?.name || params.slug;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 dark:text-gray-400 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Trang chủ</Link>
          <span>/</span>
          <Link href="/the-loai" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Thể loại</Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-white font-medium">{genreName}</span>
        </nav>

        <div className="text-center mb-8 animate-fade-in hidden sm:block">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 animate-slide-up">
            📚 {genreName}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 animate-slide-up animation-delay-200">
            Khám phá truyện thể loại {genreName} hay nhất
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <StoriesClient
              initialStories={stories}
              initialPagination={pagination}
              basePath={`/the-loai/${params.slug}`}
            />
          </div>
          <div className="lg:col-span-1">
            <StorySidebar />
          </div>
        </div>
      </div>
    </Layout>
  );
}
