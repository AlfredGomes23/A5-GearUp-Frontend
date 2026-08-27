import { MessageSquareQuote, Star } from "lucide-react";
import { getReviewsByGear } from "@/app/gear/_actions/reviewActions";

const Stars = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`size-4 ${
            i < rating
              ? "fill-yellow-400 text-yellow-400"
              : "fill-muted text-muted"
          }`}
        />
      ))}
    </div>
  );
};

const ReviewsList = async ({ gearId }: { gearId: string }) => {
  const { data: reviews } = await getReviewsByGear(gearId);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <MessageSquareQuote className="size-5" />
        <h2 className="text-xl font-bold">Reviews ({reviews.length})</h2>
      </div>

      {reviews.length === 0 ? (
        <p className="text-muted-foreground text-sm">
          No reviews yet for this gear.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="flex flex-col gap-2 p-4 rounded-lg border"
            >
              <div className="flex items-center justify-between">
                <Stars rating={review.rating} />
                <span className="text-xs text-muted-foreground">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm leading-relaxed">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewsList;
