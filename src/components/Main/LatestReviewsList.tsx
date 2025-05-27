import React, { useEffect, useState } from "react";
import LatestReviewCard from "./LatestReviewCard";
import { fetchLatestReviews } from "../../api/review";

interface Review {
  reviewId: number;
  rate: number;
  studyTime: string;
  likes: number;
  content: string;
  imageUrl: string | null;
  createdAt: string | null;
}

const LatestReviewsList: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadReviews = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchLatestReviews({
        category: "ITPROGRAMMING",
        level: "BEGINNER",
        studyTime: "WITHIN_ONE_WEEK",
        pageNumber: 0,
      });
      setReviews(data);
    } catch (e: any) {
      setError(e.message || "알 수 없는 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  if (loading) return <p className="text-center py-10">로딩 중...</p>;
  if (error) return <p className="text-center py-10 text-red-600">{error}</p>;
  if (reviews.length === 0)
    return <p className="text-center py-10">리뷰가 없습니다.</p>;

  return (
    <section className="my-10 max-w-[1290px] mx-auto mt-10 w-full">
        <h2 className="text-2xl font-semibold mb-6">최신 리뷰</h2>
      {reviews.map((review) => (
        <LatestReviewCard key={review.reviewId} review={review} />
      ))}
    </section>
  );


};

export default LatestReviewsList;
