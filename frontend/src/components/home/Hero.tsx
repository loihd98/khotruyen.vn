"use client";

import React from "react";
import Link from "next/link";

const Hero: React.FC = () => {
  return (
    <div>
      {/* Desktop Banner */}
      <div className="hidden sm:block bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Kho Truyện & Review Phim Số 1 Việt Nam
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Đọc và nghe hàng ngàn câu chuyện hay, xem review phim mới nhất từ
            cộng đồng. Trải nghiệm hoàn toàn miễn phí tại vivutruyenhay.com
          </p>
          <div className="flex flex-row gap-4 justify-center">
            <Link
              href="/stories"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              📚 Khám phá truyện
            </Link>
            <Link
              href="/stories?type=AUDIO"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              🎧 Nghe truyện audio
            </Link>
            <Link
              href="/film-reviews"
              className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors shadow-lg"
            >
              🎬 Review Phim
            </Link>
          </div>

          <div className="mt-12 grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto grid">
            <div className="text-center">
              <div className="text-4xl mb-4">📖</div>
              <h3 className="text-xl font-semibold mb-2">Đọc miễn phí</h3>
              <p className="text-blue-100">
                Hàng ngàn truyện hay hoàn toàn miễn phí
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🎧</div>
              <h3 className="text-xl font-semibold mb-2">Audio chất lượng</h3>
              <p className="text-blue-100">
                Trải nghiệm nghe truyện với âm thanh sống động
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🎬</div>
              <h3 className="text-xl font-semibold mb-2">Review Phim</h3>
              <p className="text-blue-100">
                Đánh giá phim hay nhất từ cộng đồng
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Banner - 3 action buttons */}
      <div className="sm:hidden bg-white dark:bg-gray-900 py-4 px-3">
        <div className="grid grid-cols-3 gap-2">
          <Link
            href="/stories"
            className="flex flex-col items-center gap-1.5 bg-blue-600 text-white px-3 py-3 rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors shadow-md"
          >
            <span className="text-2xl">📚</span>
            <span>Đọc Truyện</span>
          </Link>
          <Link
            href="/stories?type=AUDIO"
            className="flex flex-col items-center gap-1.5 bg-purple-600 text-white px-3 py-3 rounded-xl font-semibold text-sm hover:bg-purple-700 transition-colors shadow-md"
          >
            <span className="text-2xl">🎧</span>
            <span>Nghe Audio</span>
          </Link>
          <Link
            href="/film-reviews"
            className="flex flex-col items-center gap-1.5 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-3 rounded-xl font-semibold text-sm hover:from-yellow-600 hover:to-orange-600 transition-colors shadow-md"
          >
            <span className="text-2xl">🎬</span>
            <span>Review Phim</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
