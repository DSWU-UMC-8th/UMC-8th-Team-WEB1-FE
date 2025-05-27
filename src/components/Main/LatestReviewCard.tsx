import React from "react";
import Logo from "../../assets/Default.png";

interface Review {
  reviewId: number;
  rate: number;
  studyTime: string;
  likes: number;
  content: string;
  imageUrl: string | null;
  createdAt: string | null;
}

interface Props {
  review: Review;
}

const studyTimeMap: Record<string, string> = {
  WITHIN_ONE_WEEK: "1주 이내",
  WITHIN_ONE_MONTH: "1달 이내",
  WITHIN_THREE_MONTHS: "3달 이내",
  WITHIN_SIX_MONTHS: "6달 이내",
  WITHIN_ONE_YEAR: "1년 이내",
  INCOMPLETE: "미완료",
};

const LatestReviewCard: React.FC<Props> = ({ review }) => {
  const fullStars = Math.floor(review.rate);
  const hasHalfStar = review.rate % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="w-full max-w-[1290px] bg-white rounded-[16.83px] p-[34px] mb-[16px] shadow-md">
      <div className="flex items-center gap-3 mb-2">
        <img src={Logo} alt="Review logo" className="w-[18px] h-[18px]" />
        <div className="flex items-center mb-2">
          {[...Array(fullStars)].map((_, i) => (
            <span key={`full-${i}`} className="text-lime-400 text-xl">
              ★
            </span>
          ))}
          {hasHalfStar && (
            <span className="text-lime-400 text-xl">☆</span>
          )}
          {[...Array(emptyStars)].map((_, i) => (
            <span key={`empty-${i}`} className="text-gray-300 text-xl">
              ★
            </span>
          ))}
        </div>
        <span className="text-gray-500 ml-auto text-sm">
          공부 기간: {studyTimeMap[review.studyTime] || review.studyTime}
        </span>
        <div className="flex items-center gap-1 text-gray-600 text-sm ml-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 fill-current"
            viewBox="0 0 20 20"
          >
            <path d="M2 10c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7-8-3.134-8-7zM8 11h4v2H8v-2z" />
          </svg>
          <span>{review.likes}</span>
        </div>
      </div>

      <p className="text-gray-800 whitespace-pre-wrap leading-relaxed mb-4">
        {review.content}
      </p>

      {review.imageUrl && (
        <img
          src={review.imageUrl}
          alt="Review image"
          className="max-w-full rounded-lg object-contain"
        />
      )}

      <div className="flex gap-4 mt-3 text-gray-500 text-sm">
        <button className="flex items-center gap-1 hover:text-blue-600 transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 fill-current"
            viewBox="0 0 20 20"
          >
            <path d="M18 2H2v16l4-4h12V2z" />
          </svg>
          댓글
        </button>
        <button className="flex items-center gap-1 hover:text-red-600 transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 fill-current"
            viewBox="0 0 20 20"
          >
            <path d="M10 18l-6-6h4V2h4v10h4l-6 6z" />
          </svg>
          좋아요
        </button>
      </div>
    </div>
  );
};

export default LatestReviewCard;
