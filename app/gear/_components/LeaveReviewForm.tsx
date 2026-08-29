"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { IReview } from "@/types/types";
import {
  createReview,
  updateReview,
} from "@/app/gear/_actions/reviewActions";

type Props = {
  gearId: string;
  existingReview?: IReview | null;
};

const LeaveReviewForm = ({ gearId, existingReview }: Props) => {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [rating, setRating] = useState(existingReview?.rating ?? 5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState(existingReview?.comment ?? "");

  const isUpdate = Boolean(existingReview);
  const isDirty =
    !existingReview ||
    rating !== existingReview.rating ||
    comment !== existingReview.comment;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);

    const result = isUpdate
      ? await updateReview({ id: existingReview!.id, rating, comment })
      : await createReview({ gearId, rating, comment });

    setIsPending(false);

    if (result.success) {
      toast.success(
        isUpdate ? "Review updated successfully" : "Review submitted successfully"
      );
      router.refresh();
    } else {
      toast.error(result.message || "Failed to submit review");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label>Rating</Label>
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => {
            const value = i + 1;
            const active = hoverRating ? value <= hoverRating : value <= rating;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setRating(value)}
                onMouseEnter={() => setHoverRating(value)}
                onMouseLeave={() => setHoverRating(0)}
                disabled={isPending}
                className="p-0.5"
                aria-label={`${value} star`}
              >
                <Star
                  className={`size-6 transition-colors ${
                    active
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-muted text-muted"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="comment">Comment</Label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience with this gear..."
          disabled={isPending}
          rows={4}
          className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
          required
        />
      </div>

      <div>
        <Button type="submit" disabled={isPending || !isDirty}>
          {isPending
            ? "Saving..."
            : isUpdate
              ? "Update Review"
              : "Add Review"}
        </Button>
      </div>
    </form>
  );
};

export default LeaveReviewForm;