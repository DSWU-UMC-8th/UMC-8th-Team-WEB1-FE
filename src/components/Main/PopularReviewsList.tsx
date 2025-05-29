import { useEffect, useRef, useState } from "react";
import PopularReviewCard from "./PopularReviewCard";
import profileImg from "../../assets/mainporfile.svg";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../../pages/LoadingPage";

const PopularReviewsList = () => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const API_BASE_URL = import.meta.env.VITE_SERVER_API_URL;
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const fetchPopularReviews = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${API_BASE_URL}/reviews/popular?pageNumber=0`
      );
      if (!response.ok) {
        throw new Error(`API 오류: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      setReviews(data.result || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPopularReviews();
  }, []);

  // 자동 스크롤 로직 - 무한 스크롤 느낌
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;
    if (reviews.length === 0) return;

    const scrollStep = 1; // 한 번에 스크롤할 px 양
    const delay = 40; // 스크롤 주기 (ms)

    // 한 세트 너비 = 전체 스크롤 너비의 절반 (배열을 2배 렌더링했기 때문)
    const singleSetWidth = scrollContainer.scrollWidth / 2;

    const intervalId = setInterval(() => {
      if (!scrollContainer) return;

      // 현재 스크롤 위치 + 스텝
      const newScrollLeft = scrollContainer.scrollLeft + scrollStep;

      if (newScrollLeft >= singleSetWidth) {
        // 한 세트를 넘어가면 스크롤 위치를 처음 세트 시작 위치로 점프
        scrollContainer.scrollLeft = newScrollLeft - singleSetWidth;
      } else {
        scrollContainer.scrollLeft = newScrollLeft;
      }
    }, delay);

    return () => clearInterval(intervalId);
  }, [reviews]);

  if (loading) return <LoadingPage />;
  if (error) return <p>에러 발생: {error}</p>;

  // 리뷰 배열 2배로 늘리기
  const extendedReviews = [...reviews, ...reviews];

  return (
    <div className="px-4 py-8 bg-[#f7f8f9] font-[Pretendard]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-[#2d2d2d]">인기 리뷰</h2>
        <button
          type="button"
          className="text-sm text-gray-500 hover:text-gray-800 transition  cursor-pointer"
          onClick={() => {
            navigate("/reviews/popular");
          }}
        >
          전체보기 &gt;
        </button>
      </div>

      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto whitespace-nowrap px-2 scroll-smooth py-2"
        style={{
          scrollBehavior: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <style>
          {`
      div::-webkit-scrollbar {
        display: none;
      }
    `}
        </style>

        {reviews.length === 0 && <p>리뷰가 없습니다.</p>}
        {extendedReviews.map((review, index) => (
          <div
            key={`${review.reviewId}-${index}`}
            className="inline-block mr-4"
          >
            <PopularReviewCard
              reviewId={review.reviewId}
              lectureTitle={review.lectureName}
              rating={review.rate}
              content={review.content}
              teacherName={review.teacher}
              teacherImage={review.imageUrl ? review.imageUrl : profileImg}
              onClick={() => navigate(`/reviews/${review.reviewId}`)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularReviewsList;
