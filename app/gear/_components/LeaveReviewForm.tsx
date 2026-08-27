"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { createReview } from "@/app/gear/_actions/reviewActions";

const LeaveReviewForm = ({ gearId }: { gearId: string }) => {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);

    const result = await createReview({ gearId, rating, comment });

    setIsPending(false);

    if (result.success) {
      toast.success("Review submitted successfully");
      setComment("");
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
        <Button type="submit" disabled={isPending}>
          {isPending ? "Submitting..." : "Submit Review"}
        </Button>
      </div>
    </form>
  );
};

export default LeaveReviewForm;
