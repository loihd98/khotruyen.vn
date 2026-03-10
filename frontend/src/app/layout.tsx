// app/layout.tsx (RootLayout - server component)
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../styles/globals.css";
import ClientProvider from "./providers";
import ThemeProvider from "@/components/layout/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vivutruyenhay.com";
const siteName = "Vivu Truyện Hay";
const siteDescription =
  "Vivu Truyện Hay là website tổng hợp truyện audio, truyện đọc online và phim hay với nhiều thể loại hấp dẫn như truyện ma, truyện trinh thám, truyện ngôn tình, truyện đô thị và truyện tình cảm người lớn. Nội dung trên website được cập nhật liên tục mỗi ngày giúp người nghe và người đọc có thể dễ dàng tìm thấy những câu chuyện hấp dẫn. Kho truyện audio tại Vivu Truyện Hay bao gồm hàng nghìn truyện mp3 với nhiều thể loại như truyện ma, truyện trinh thám, truyện ngôn tình, truyện đô thị, truyện kiếm hiệp và truyện tiên hiệp. Người dùng có thể nghe truyện online miễn phí với chất lượng âm thanh tốt và nội dung được chọn lọc.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Vivu Truyện Hay – Nghe Truyện Audio, Đọc Truyện Online Và Xem Phim Hay Mỗi Ngày",
    template: "%s | Vivu Truyện Hay",
  },
  description: siteDescription,
  keywords: [
    "vivutruyenhay",
    "vivutruyenhay.com",
    "vivu truyện hay",
    "vi vu truyện hay",
    "vivu truyen hay",
    "web vivu truyện hay",
    "nghe truyện audio",
    "nghe truyện audio hay",
    "truyện audio hay nhất",
    "web nghe truyện audio",
    "truyện audio mp3",
    "nghe truyện mp3 miễn phí",
    "truyện audio online",
    "nghe truyện online",
    "truyện audio miễn phí",
    "truyện audio mới nhất",
    "truyện audio",
    "truyện audio hay",
    "truyện audio full",
    "truyện audio chọn lọc",
    "nghe truyện đêm khuya",
    "truyện audio nổi tiếng",
    "đọc truyện online",
    "truyện chữ",
    "truyện hay",
    "kho truyện",
    "truyện miễn phí",
    "truyện full",
    "đọc truyện miễn phí",
    "truyện ngôn tình audio",
    "nghe truyện ngôn tình",
    "truyện ngôn tình hay",
    "truyện ma audio",
    "nghe truyện ma",
    "truyện ma hay",
    "truyện đô thị audio",
    "nghe truyện đô thị",
    "truyện đô thị hay",
    "truyện tiên hiệp audio",
    "nghe truyện tiên hiệp",
    "truyện tiên hiệp hay",
    "truyện kiếm hiệp audio",
    "nghe truyện kiếm hiệp",
    "truyện kiếm hiệp hay",
    "truyện trinh thám audio",
    "nghe truyện trinh thám",
    "truyện trinh thám hay",
    "truyện tình cảm audio",
    "nghe truyện tình cảm",
    "truyện tình cảm hay",
    "truyện drama audio",
    "nghe truyện drama",
    "truyện hài hước audio",
    "truyện lãng mạn audio",
    "truyện thanh xuân audio",
    "truyện kinh dị audio",
    "review phim",
    "đánh giá phim",
    "phim hay",
    "xem phim online",
    "phim mới",
    "phim hành động",
    "phim tình cảm",
    "phim kinh dị",
    "review truyện hay",
    "review truyện audio",
    "top truyện audio hay",
    "truyện hay nên nghe",
  ],
  authors: [{ name: "Evanloi9x", url: siteUrl }],
  creator: "Evanloi9x",
  publisher: "Evanloi9x",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: siteUrl,
    siteName: siteName,
    title: "Vivu Truyện Hay – Nghe Truyện Audio, Đọc Truyện Online Và Xem Phim Hay Mỗi Ngày",
    description: siteDescription,
    images: [
      {
        url: "/vivutruyenhay_logo.jpg",
        width: 1200,
        height: 630,
        alt: "Vivu Truyện Hay – Kho truyện audio, truyện chữ và review phim",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vivu Truyện Hay – Nghe Truyện Audio, Đọc Truyện Online Và Xem Phim Hay",
    description: siteDescription,
    images: ["/vivutruyenhay_logo.jpg"],
    creator: "@Evanloi9x",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/vivutruyenhay_logo.jpg", type: "image/jpeg" },
    ],
    apple: [{ url: "/vivutruyenhay_logo.jpg", type: "image/jpeg" }],
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: siteUrl,
  },
  verification: {
    // Thêm các mã xác thực của bạn ở đây khi có
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
  category: "entertainment",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" suppressHydrationWarning className="dark">
      <head>
        <meta name="theme-color" content="#1e40af" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="vivutruyenhay.com" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="vivutruyenhay.com" />
        <link rel="author" href={`${siteUrl}/humans.txt`} />
        {/* Inline script to force dark theme before React hydration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('dark');`,
          }}
        />
      </head>
      <body className={inter.className}>
        <ClientProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </ClientProvider>
      </body>
    </html>
  );
}
