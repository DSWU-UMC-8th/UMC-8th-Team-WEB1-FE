import React, { useEffect, useState } from "react";
import LatestReviewCard from "./LatestReviewCard";
import { fetchLatestReviews } from "../../api/review";
import { useNavigate } from "react-router-dom";

interface Review {
  reviewId: number;
  rate: number;
  studyTime: string;
  likes: number;
  content: string;
  imageUrl: string | null;
  createdAt: string | null;
}

interface LatestReviewsListProps {
  category: string;
  difficulty: string;
  entryPeriod: string;
}

const LatestReviewsList: React.FC<LatestReviewsListProps> = ({
  category,
  difficulty,
  entryPeriod,
}) => {
  const navigate = useNavigate();

  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadReviews = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchLatestReviews({
        category,
        level: difficulty,
        studyTime: entryPeriod,
        pageNumber: 0,
      });
      setReviews(data);
    } catch (e: any) {
      setError(e.message || "알 수 없는 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 필터가 바뀔 때마다 최신 리뷰 재조회
  useEffect(() => {
    loadReviews();
  }, [category, difficulty, entryPeriod]);

  if (loading) return <p className="text-center py-10">로딩 중...</p>;
  if (error)
    return (
      <p className="text-center py-10 text-red-600" role="alert">
        {error}
      </p>
    );
  if (reviews.length === 0)
    return <p className="text-center py-10">리뷰가 없습니다.</p>;

  return (
    <section className="my-10 max-w-[1290px] mx-auto w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">최신 리뷰</h2>
        <button
          type="button"
          className="text-sm text-gray-500 hover:text-gray-800 transition"
          onClick={() => {
            navigate("/reviews/latest");
          }}
        >
          전체보기 &gt;
        </button>
      </div>

      {reviews.map((review) => (
        <LatestReviewCard
          key={review.reviewId}
          review={review}
          onClick={() => navigate(`/reviews/${review.reviewId}`)}
        />
      ))}
    </section>
  );
};

export default LatestReviewsList;
