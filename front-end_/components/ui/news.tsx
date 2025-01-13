"use client";

import { useGetNews } from "@/api/useGetNews";
import { ResponseType } from "@/types/response";
import { NewType } from "@/types/new";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const News = () => {
  const { loading, result }: ResponseType = useGetNews();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!result || result.length === 0) {
    return <p>No news available</p>;
  }

  return (
    <Accordion type="single" collapsible>
      {result.map((newsItem: NewType) => (
        <AccordionItem key={newsItem.id} value={`item-${newsItem.id}`}>
          <AccordionTrigger>{newsItem.title}</AccordionTrigger>
          <AccordionContent>
            <div>
              <p>
                <strong>Author:</strong> {newsItem.author}
              </p>
              <p>
                <strong>Published Date:</strong>{" "}
                {new Date(newsItem.published_date).toLocaleDateString()}
              </p>
              <p>
                <strong>Category:</strong> {newsItem.category.name}
              </p>
              <p>
                <strong>Content:</strong>
              </p>
              {newsItem.content.map((block, index) => (
                <p key={index}>
                  {block.children.map((child) => child.text).join("")}
                </p>
              ))}
              {newsItem.featured_image?.formats?.thumbnail?.url && (
                <img
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${newsItem.featured_image.formats.thumbnail.url}`}
                  alt={
                    newsItem.featured_image.alternativeText || newsItem.title
                  }
                />
              )}
              <p>
                <a
                  href={newsItem.external_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read more
                </a>
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default News;
