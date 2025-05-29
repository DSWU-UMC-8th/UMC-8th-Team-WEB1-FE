import React, { useEffect, useState } from "react";
import LatestReviewCard from "./LatestReviewCard";
import { useNavigate } from "react-router-dom";

interface Review {
  reviewId: number;
  rate: number;
  studyTime: string;
  likes: number;
  content: string;
  imageUrl: string | null;
  createdAt: string | null;
  lectureName: string;
  teacher: string;
}

interface PopularReviewsListProps {
  category: string;
  difficulty: string;
  entryPeriod: string;
}

const API_BASE_URL = import.meta.env.VITE_SERVER_API_URL;

const PopularReviewsList: React.FC<PopularReviewsListProps> = ({
  category,
  difficulty,
  entryPeriod,
}) => {
  const navigate = useNavigate();

  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 필터 포함 API 호출 함수
  const fetchPopularReviews = async (pageNumber = 0) => {
    setLoading(true);
    setError(null);

    try {
      // URLSearchParams를 사용해 쿼리 파라미터 생성
      const params = new URLSearchParams();
      if (category) params.append("category", category);
      if (difficulty) params.append("level", difficulty);
      if (entryPeriod) params.append("studyTime", entryPeriod);
      params.append("pageNumber", pageNumber.toString());

      const response = await fetch(
        `${API_BASE_URL}/reviews/popular?${params.toString()}`
      );

      if (!response.ok) {
        throw new Error(`API 오류: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setReviews(data.result || []);
    } catch (err: any) {
      setError(err.message || "알 수 없는 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 필터가 바뀔 때마다 API 재호출
  useEffect(() => {
    fetchPopularReviews(0);
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
        <h2 className="text-2xl font-semibold">인기 리뷰</h2>
        <button
          type="button"
          className="text-sm text-gray-500 hover:text-gray-800 transition"
          onClick={() => {
            navigate("/reviews/popular");
          }}
        >
          전체보기 &gt;
        </button>
      </div>

      {/* 세로 리스트 */}
      <div className="flex flex-col gap-4">
        {reviews.map((review) => (
          <LatestReviewCard
            key={review.reviewId}
            review={review}
            onClick={() => navigate(`/reviews/${review.reviewId}`)}
          />
        ))}
      </div>
    </section>
  );
};

export default PopularReviewsList;
