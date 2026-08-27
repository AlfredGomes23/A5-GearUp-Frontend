"use client";

import * as React from "react";
import { Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { IReview } from "@/types/types";

const ReviewsCarousel = ({ reviews }: { reviews: IReview[] }) => {
  const [api, setApi] = React.useState<CarouselApi>();

  React.useEffect(() => {
    if (!api || reviews.length <= 1) return;

    const timer = setInterval(() => {
      if (!api.canScrollNext()) {
        api.scrollTo(0);
      } else {
        api.scrollNext();
      }
    }, 3500);

    return () => clearInterval(timer);
  }, [api, reviews.length]);

  if (reviews.length === 0) {
    return <p className="text-center text-muted-foreground text-sm">No reviews yet.</p>;
  }

  return (
    <Carousel
      setApi={setApi}
      className="w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto"
    >
      <CarouselContent className="py-2">
        {reviews.map((review) => (
          <CarouselItem
            key={review.id}
            className="basis-1/2 pl-2 lg:basis-1/3 sm:pl-3"
          >
            <div className="p-1 h-full">
              <Card className="h-full">
                <CardContent className="flex h-full flex-col justify-between gap-3 p-4">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`size-3 ${
                          i < review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-muted text-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground leading-snug line-clamp-3">
                    &ldquo;{review.comment}&rdquo;
                  </p>
                  <span className="text-xs font-medium">
                    {review.gear?.title ?? "Gear Review"}
                  </span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default ReviewsCarousel;
