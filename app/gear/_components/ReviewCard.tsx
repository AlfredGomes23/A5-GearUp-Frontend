"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Star, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { IReview } from "@/types/types";
import { updateReview } from "@/app/gear/_actions/reviewActions";

const Stars = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`size-4 ${
            i < rating ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted"
          }`}
        />
      ))}
    </div>
  );
};

const ReviewCard = ({ review, canEdit }: { review: IReview; canEdit?: boolean }) => {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [rating, setRating] = useState(review.rating);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState(review.comment);
  const [isPending, setIsPending] = useState(false);

  const handleSave = async () => {
    setIsPending(true);
    const result = await updateReview({ id: review.id, rating, comment });
    setIsPending(false);

    if (result.success) {
      toast.success("Review updated successfully");
      setEditing(false);
      router.refresh();
    } else {
      toast.error(result.message || "Failed to update review");
    }
  };

  return (
    <div className="flex flex-col gap-2 p-4 rounded-lg border">
      <div className="flex items-center justify-between">
        <Stars rating={review.rating} />
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            {new Date(review.createdAt).toLocaleDateString()}
          </span>
          {canEdit && !editing && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setEditing(true)}
              className="h-7 px-2 text-muted-foreground hover:text-primary"
            >
              <Pencil className="size-3.5 mr-1" /> Edit
            </Button>
          )}
        </div>
      </div>

      {editing ? (
        <div className="flex flex-col gap-3 border-t pt-3 mt-1">
          <div className="flex flex-col gap-1.5">
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
                      className={`size-5 transition-colors ${
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
          <div className="flex flex-col gap-1.5">
            <Label htmlFor={`comment-${review.id}`}>Comment</Label>
            <textarea
              id={`comment-${review.id}`}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              disabled={isPending}
              rows={3}
              required
              className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
            />
          </div>
          <div className="flex gap-2">
            <Button size="sm" onClick={handleSave} disabled={isPending}>
              {isPending ? "Saving..." : "Save"}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                setEditing(false);
                setRating(review.rating);
                setComment(review.comment);
              }}
              disabled={isPending}
            >
              <X className="size-4 mr-1" /> Cancel
            </Button>
          </div>
        </div>
      ) : (
        <p className="text-sm leading-relaxed">{review.comment}</p>
      )}
    </div>
  );
};

export default ReviewCard;