import React from "react";
import ReviewArrowImg from "../../assets/reviewdetail.png";
import halfStarImg from "../../assets/halfstar.png";

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
      <div className="flex-1 h-3 bg-[#CAE3A5] rounded-full mx-2 overflow-hidden">
        <div
          className="h-3 rounded-full"
          style={{ width: `${percent}%`, backgroundColor: '#6FA235' }}
        />
      </div>
      <div className="w-6 text-right">{count}</div>
    </div>
  );
};

const ReviewSummaryPage: React.FC = () => {
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
  const halfStar = averageScore - fullStars > 0;  // 0.25 이상이면 반별 표시


  return (
    <div className="mt-8 bg-gray-50 flex items-center justify-center p-4">
      <div className="flex justify-center items-center p-4 rounded-lg gap-12 w-[995px] h-[219px]">
        {/* 좌측 별점 및 리뷰 개수 */}
        <div className="flex flex-col items-center space-y-3 w-48">
          <div className="text-3xl font-semibold text-gray-700">
            {averageScore.toFixed(2)}
          </div>
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => {
  if (i < fullStars) {
    // 채워진 별 - 초록색
    return <span key={i} className="text-3xl text-[#B4D780]">★</span>;
  } else if (i === fullStars && halfStar) {
    // 반쪽별 이미지
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
    // 빈 별 - 회색
    return <span key={i} className="text-3xl text-gray-300">★</span>;
  }
})}

          </div>
          <div className="text-sm font-medium text-green-700">
            {totalReviews}개의 리뷰가 있습니다.
          </div>
          <img
            src={ReviewArrowImg}
            alt="상세 리뷰 보러가기"
            className="cursor-pointer"
            style={{ width: "256px", height: "40px" }}
          />
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
