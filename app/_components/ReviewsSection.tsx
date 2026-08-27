import ReviewsCarousel from "@/components/shared/ReviewsCarousel";
import { getAllReviews } from "@/app/gear/_actions/reviewActions";

const ReviewsSection = async () => {
  const { data: reviews } = await getAllReviews(5);

  return <ReviewsCarousel reviews={reviews} />;
};

export default ReviewsSection;
