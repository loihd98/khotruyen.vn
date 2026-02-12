import Layout from "../components/layout/Layout";
import Hero from "../components/home/Hero";
import FeaturedFilmReviews from "../components/home/FeaturedFilmReviews";
import FeaturedStories from "../components/home/FeaturedStories";
import ThemedGenreSections from "../components/home/ThemedGenreSections";
import JsonLd, {
  getOrganizationSchema,
  getWebsiteSchema,
} from "../components/seo/JsonLd";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vivutruyenhay.com";
const API_URL = process.env.API_URL || "http://localhost:5000/api";

const THEMED_GENRE_SLUGS = ["kiem-hiep", "tien-hiep", "ngon-tinh", "do-thi"];

async function fetchHomepageData() {
  try {
    const [
      filmReviewsRes,
      textStoriesRes,
      audioStoriesRes,
      trendingStoriesRes,
      recentStoriesRes,
      ...genreResponses
    ] = await Promise.all([
      fetch(`${API_URL}/film-reviews?limit=8&sort=createdAt`, { next: { revalidate: 300 } }).catch(() => null),
      fetch(`${API_URL}/stories?type=TEXT&limit=12`, { next: { revalidate: 300 } }).catch(() => null),
      fetch(`${API_URL}/stories?type=AUDIO&limit=8`, { next: { revalidate: 300 } }).catch(() => null),
      fetch(`${API_URL}/stories?sort=viewCount&limit=6`, { next: { revalidate: 300 } }).catch(() => null),
      fetch(`${API_URL}/stories?sort=updatedAt&limit=8`, { next: { revalidate: 300 } }).catch(() => null),
      ...THEMED_GENRE_SLUGS.map((slug) =>
        fetch(`${API_URL}/stories?type=AUDIO&genre=${slug}&limit=6&sort=viewCount`, { next: { revalidate: 300 } }).catch(() => null)
      ),
    ]);

    const filmReviews = filmReviewsRes?.ok ? (await filmReviewsRes.json())?.data || [] : [];
    const textStories = textStoriesRes?.ok ? (await textStoriesRes.json())?.data || [] : [];
    const audioStories = audioStoriesRes?.ok ? (await audioStoriesRes.json())?.data || [] : [];
    const trendingStories = trendingStoriesRes?.ok ? (await trendingStoriesRes.json())?.data || [] : [];
    const recentStories = recentStoriesRes?.ok ? (await recentStoriesRes.json())?.data || [] : [];

    const sectionData: Record<string, any[]> = {};
    for (let i = 0; i < THEMED_GENRE_SLUGS.length; i++) {
      const res = genreResponses[i];
      const key = `AUDIO-${THEMED_GENRE_SLUGS[i]}`;
      sectionData[key] = res?.ok ? (await res.json())?.data || [] : [];
    }

    return { filmReviews, textStories, audioStories, trendingStories, recentStories, sectionData };
  } catch (error) {
    console.error("Error fetching homepage data:", error);
    return { filmReviews: [], textStories: [], audioStories: [], trendingStories: [], recentStories: [], sectionData: {} };
  }
}

export default async function HomePage() {
  const { filmReviews, textStories, audioStories, trendingStories, recentStories, sectionData } = await fetchHomepageData();

  return (
    <>
      <JsonLd data={getOrganizationSchema(siteUrl)} />
      <JsonLd data={getWebsiteSchema(siteUrl)} />
      <Layout>
        <Hero />
        <FeaturedFilmReviews initialReviews={filmReviews} />
        <div className="container mx-auto px-4">
          <ThemedGenreSections initialSectionData={sectionData} />
        </div>
        <FeaturedStories
          initialTextStories={textStories}
          initialAudioStories={audioStories}
          initialTrendingStories={trendingStories}
          initialRecentStories={recentStories}
        />
      </Layout>
    </>
  );
}
