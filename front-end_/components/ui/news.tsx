"use client";
import { useState } from "react";
import { useGetNews } from "@/api/useGetNews";
import { ResponseType } from "@/types/response";
import { NewType } from "@/types/new";

const BASE_URL = "http://localhost:1337"; // Cambia esto según tu entorno

const News = () => {
  const { loading, result }: ResponseType = useGetNews();
  const [selectedNews, setSelectedNews] = useState<NewType | null>(null);

  if (loading) {
    return (
      <p className="text-center text-xl font-semibold text-gray-700">
        Loading...
      </p>
    );
  }

  if (!result || result.length === 0) {
    return (
      <p className="text-center text-xl font-semibold text-gray-700">
        No news available
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#98b4b2] to-gray-300 p-8">
      <h1 className="text-4xl font-bold text-center text-white mb-10">
        Latest News
      </h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Listado de noticias */}
        <div className="flex-1">
          {result.map((newsItem: NewType) => (
            <div
              key={newsItem.id}
              className={`border border-gray-200 rounded-xl shadow-lg bg-white mb-4 transition-all duration-300 ${
                selectedNews?.id === newsItem.id
                  ? "bg-gray-100 ring-2 ring-blue-400"
                  : "hover:bg-gray-100"
              }`}
            >
              <button
                className="w-full px-4 py-3 font-semibold text-left text-gray-800 hover:text-gray-600 transition-colors duration-300"
                onClick={() => setSelectedNews(newsItem)}
              >
                {newsItem.title}
              </button>
            </div>
          ))}
        </div>

        {/* Previsualización persistente */}
        <div
          className={`flex-1 ${
            selectedNews ? "opacity-100" : "opacity-50 pointer-events-none"
          } transition-opacity duration-300`}
        >
          {selectedNews ? (
            <div className="p-6 bg-white rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {selectedNews.title}
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                <strong>Author:</strong> {selectedNews.author} |{" "}
                <strong>Published:</strong>{" "}
                {new Date(selectedNews.published_date).toLocaleDateString()}
              </p>
              <div className="text-gray-700 mb-4">
                {selectedNews.content.slice(0, 2).map((block, index) => (
                  <p key={index} className="leading-relaxed text-justify">
                    {block.children.map((child) => child.text).join("")}
                  </p>
                ))}
              </div>
              {selectedNews.featured_image?.formats?.medium?.url && (
                <img
                  src={`${BASE_URL}${selectedNews.featured_image.formats.medium.url}`}
                  alt={
                    selectedNews.featured_image.alternativeText ||
                    selectedNews.title
                  }
                  className="w-full max-w-sm mx-auto rounded-lg shadow-md"
                />
              )}
              <a
                href={selectedNews.external_link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-blue-500 hover:underline hover:text-blue-600 transition duration-300"
              >
                Read full article →
              </a>
            </div>
          ) : (
            <div className="p-6 bg-white rounded-xl shadow-lg text-center">
              <p className="text-gray-600">
                Select a news article to see details.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default News;
