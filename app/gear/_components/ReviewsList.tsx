import { MessageSquareQuote } from "lucide-react";
import { getReviewsByGear } from "@/app/gear/_actions/reviewActions";
import ReviewCard from "./ReviewCard";

const ReviewsList = async ({
  gearId,
  currentUserId,
}: {
  gearId: string;
  currentUserId?: string;
}) => {
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
            <ReviewCard
              key={review.id}
              review={review}
              canEdit={Boolean(currentUserId && review.customerId === currentUserId)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewsList;