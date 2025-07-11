import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useCreateReview } from "../../../services/reviewService";
import toast from "react-hot-toast";
import Button from "../../ui/Button/Button";
import "./productReviewForm.css";

interface Props {
  productId: number;
  onReviewSubmitted?: () => void;
}

const ProductReviewForm = ({ productId, onReviewSubmitted }: Props) => {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { mutate: createReview, isPending: isSubmitting } = useCreateReview(
    () => {
      toast.success("Review sent!");
      setRating(0);
      setComment("");
      onReviewSubmitted?.();
    },
    () => {
      toast.error("There was an error submitting your review.");
    }
  );

  if (!user) {
    return (
      <div className="review-message">
        <p className="review-message__text">
          You must be logged in to leave a review.
        </p>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0 || comment.trim() === "") {
      toast.error("Please provide a rating and comment");
      return;
    }

    createReview({
      product_id: productId,
      rating,
      comment: comment.trim(),
    });
  };

  const renderStars = () =>
    Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`review-form__star ${i < rating ? "active" : ""}`}
        onClick={() => setRating(i + 1)}
      >
        ★
      </span>
    ));

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <h3 className="review-form__title">Leave a review</h3>

      <div className="review-form__stars">{renderStars()}</div>

      <textarea
        className="review-form__textarea"
        placeholder="Write your review..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
      ></textarea>

      <Button
        text="Submit review"
        submittingText="Sending..."
        isSubmitting={isSubmitting}
        disabled={isSubmitting}
      />
    </form>
  );
};

export default ProductReviewForm;
