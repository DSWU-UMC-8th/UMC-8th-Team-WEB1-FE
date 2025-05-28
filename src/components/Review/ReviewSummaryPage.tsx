import React, { useEffect, useState } from "react";
import ReviewArrowImg from "../../assets/reviewdetail.png";
import halfStarImg from "../../assets/halfstar.png";
import { useParams } from "react-router-dom";

interface RatingApiResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    lectureId: number;
    lectureName: string;
    reviewCounts: number; // 총 리뷰 개수
    totalRating: number;  // 평균 평점
    ratingCounts: number[]; // [별1, 별2, 별3, 별4, 별5] 개수 순서
  };
}

const ratingLabels = ["별로예요", "그냥 그래요", "보통이에요", "맘에 들어요", "아주 좋아요"];

const RatingBar: React.FC<{ label: string; count: number; maxCount: number }> = ({
  label,
  count,
  maxCount,
}) => {
  const percent = maxCount > 0 ? (count / maxCount) * 100 : 0;
  return (
    <div className="flex items-center text-sm text-gray-700 mb-1">
      <div className="w-24">{label}</div>
      <div className="flex-1 h-3 bg-[#CAE3A5] rounded-full mx-2 overflow-hidden">
        <div
          className="h-3 rounded-full"
          style={{ width: `${percent}%`, backgroundColor: "#6FA235" }}
        />
      </div>
      <div className="w-6 text-right">{count}</div>
    </div>
  );
};

const ReviewSummaryPage: React.FC = () => {
  const { lectureId } = useParams<{ lectureId: string }>();

  const [totalReviews, setTotalReviews] = useState<number>(0);
  const [averageScore, setAverageScore] = useState<number>(0);
  // ratingCounts 배열: [1점 개수, 2점 개수, ..., 5점 개수]
  const [ratingCounts, setRatingCounts] = useState<number[]>([0, 0, 0, 0, 0]);

  const fetchReviewSummary = async (id: number) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_API_URL}/api/lectures/${id}/rating`, {
        headers: { accept: "*/*" },
      });
      if (!res.ok) throw new Error("별점 통계 정보를 불러오는데 실패했습니다.");
      const data: RatingApiResponse = await res.json();
      if (data.isSuccess && data.result) {
        setTotalReviews(data.result.reviewCounts);
        setAverageScore(data.result.totalRating);
        setRatingCounts(data.result.ratingCounts);
      } else {
        throw new Error("데이터가 없습니다.");
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (lectureId) {
      fetchReviewSummary(Number(lectureId));
    }
  }, [lectureId]);

  const fullStars = Math.floor(averageScore);
  const halfStar = averageScore - fullStars >= 0.25;

  return (
    <div className="mt-8 bg-gray-50 flex items-center justify-center p-4">
      <div className="flex justify-center items-center p-4 rounded-lg gap-12 w-[995px] h-[219px]">
        {/* 좌측 별점 및 리뷰 개수 */}
        <div className="flex flex-col items-center space-y-3 w-48">
          <div className="text-3xl font-semibold text-gray-700">{averageScore.toFixed(2)}</div>
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => {
              if (i < fullStars) {
                return (
                  <span key={i} className="text-3xl text-[#B4D780]">
                    ★
                  </span>
                );
              } else if (i === fullStars && halfStar) {
                return (
                  <img
                    key={i}
                    src={halfStarImg}
                    alt="반쪽별"
                    style={{
                      width: 27,
                      height: 27,
                      verticalAlign: "text-bottom",
                      display: "inline-block",
                      marginTop: 7,
                    }}
                  />
                );
              } else {
                return (
                  <span key={i} className="text-3xl text-gray-300">
                    ★
                  </span>
                );
              }
            })}
          </div>
          <div className="text-sm font-medium text-green-700">{totalReviews}개의 리뷰가 있습니다.</div>
          <img
            src={ReviewArrowImg}
            alt="상세 리뷰 보러가기"
            className="cursor-pointer"
            style={{ width: "256px", height: "40px" }}
          />
        </div>

        {/* 우측 평점별 막대 */}
        <div className="flex-1">
          {ratingLabels
            .map((label, idx) => ({
              label,
              // API의 ratingCounts는 1점부터 5점 순서, 뒤집어서 5점부터 표시
              count: ratingCounts[4 - idx] ?? 0,
            }))
            .map(({ label, count }) => (
              <RatingBar key={label} label={label} count={count} maxCount={totalReviews} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewSummaryPage;
