import React from "react";
import { useNavigate } from "react-router-dom";

interface RatingBarProps {
  label: string;
  count: number;
  maxCount: number;
}

const RatingBar: React.FC<RatingBarProps> = ({ label, count, maxCount }) => {
  const percent = maxCount > 0 ? (count / maxCount) * 100 : 0;
  return (
    <div className="flex items-center text-sm text-gray-700 mb-1">
      <div className="w-24">{label}</div>
      <div className="flex-1 h-4 bg-green-100 rounded-full mx-2 overflow-hidden">
        <div
          className="h-4 bg-green-600 rounded-full"
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className="w-6 text-right">{count}</div>
    </div>
  );
};

const ReviewSummaryPage: React.FC = () => {
  const navigate = useNavigate();

  const averageScore = 4.25;
  const totalReviews = 25;
  const ratingCounts = {
    아주좋아요: 23,
    맘에들어요: 2,
    보통이에요: 0,
    그냥그래요: 0,
    별로에요: 0,
  };

  const fullStars = Math.floor(averageScore);
  const halfStar = averageScore - fullStars >= 0.5;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="flex justify-center items-center p-8 rounded-lg gap-12 max-w-3xl w-full">
        {/* 좌측 별점 및 리뷰 개수 */}
        <div className="flex flex-col items-center space-y-3 w-48">
          <div className="text-3xl font-semibold text-gray-700">
            {averageScore.toFixed(2)}
          </div>
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => {
              if (i < fullStars)
                return (
                  <span key={i} className="text-green-500 text-3xl">
                    ★
                  </span>
                );
              else if (i === fullStars && halfStar)
                return (
                  <span key={i} className="text-green-500 text-3xl">
                    ☆{/* 반별은 SVG로 대체 가능 */}
                  </span>
                );
              else
                return (
                  <span key={i} className="text-gray-300 text-3xl">
                    ★
                  </span>
                );
            })}
          </div>
          <div className="text-sm font-medium text-green-700">
            {totalReviews}개의 리뷰가 있습니다.
          </div>
          <button
            className="px-4 py-1 text-xs font-semibold bg-gray-300 rounded hover:bg-gray-400"
            onClick={() => navigate("/reviews")}
            type="button"
          >
            상세 리뷰 보러가기 &gt;
          </button>
        </div>

        {/* 우측 평점별 막대 */}
        <div className="flex-1">
          <RatingBar
            label="아주 좋아요"
            count={ratingCounts.아주좋아요}
            maxCount={totalReviews}
          />
          <RatingBar
            label="맘에 들어요"
            count={ratingCounts.맘에들어요}
            maxCount={totalReviews}
          />
          <RatingBar
            label="보통이에요"
            count={ratingCounts.보통이에요}
            maxCount={totalReviews}
          />
          <RatingBar
            label="그냥 그래요"
            count={ratingCounts.그냥그래요}
            maxCount={totalReviews}
          />
          <RatingBar
            label="별로예요"
            count={ratingCounts.별로에요}
            maxCount={totalReviews}
          />
        </div>
      </div>
    </div>
  );
};

export default ReviewSummaryPage;
