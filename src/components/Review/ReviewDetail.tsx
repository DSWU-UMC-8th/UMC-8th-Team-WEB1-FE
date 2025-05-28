import React, { useEffect, useState } from "react";
import ReviewDetailCard from "./ReviewDetailCard";
import { useNavigate, useParams } from "react-router-dom";

interface Review {
  reviewId: number;
  lectureName: string;
  rate: number;
  teacher: string;
  studyTime: string;
  likes: number;
  content: string;
  imageUrl: string | null;
  createdAt: string | null;
}

const ReviewDetail: React.FC = () => {
  const { lectureId } = useParams<{ lectureId: string }>(); // URL에서 lectureId 받기
  const navigate = useNavigate();

  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReviewsByLectureId = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_API_URL}/api/lectures/${id}/reviews`,
        {
          headers: { accept: "*/*" },
        }
      );
      if (!res.ok) throw new Error("리뷰를 불러오는 데 실패했습니다.");
      const data = await res.json();

      if (data.isSuccess && data.result) {
        setReviews(data.result);
      } else {
        setError("리뷰 데이터가 없습니다.");
      }
    } catch (e: any) {
      setError(e.message || "알 수 없는 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (lectureId) {
      fetchReviewsByLectureId(Number(lectureId));
    }
  }, [lectureId]);

  if (loading) return <p className="text-center py-10">리뷰 로딩 중...</p>;
  if (error)
    return (
      <p className="text-center py-10 text-red-600" role="alert">
        {error}
      </p>
    );
  if (reviews.length === 0) return <p className="text-center py-10">리뷰가 없습니다.</p>;

  return (
    <section className="my-10 max-w-[1290px] mx-auto w-full">
      
      {reviews.map((review) => (
        <ReviewDetailCard
          key={review.reviewId}
          review={review}
          onClick={() => navigate(`/reviews/${review.reviewId}`)}
        />
      ))}
    </section>
  );
};

export default ReviewDetail;
