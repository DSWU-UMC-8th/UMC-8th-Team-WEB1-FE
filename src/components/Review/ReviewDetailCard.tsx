import React, { useState, MouseEvent } from "react";
import halfStarImg from "../../assets/halfstar.png";

import Logo from "../../assets/Default.png";
import feedback from "../../assets/feedback.png"; // 기본 상태 (아직 안눌린 상태)
import feedbackbad from "../../assets/feedback-bad.png"; // 싫어요 눌린 상태
import feedbackgood from "../../assets/feedback-good.png"; // 좋아요 눌린 상태
import good from "../../assets/good.png";

export interface Review {
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

interface ReviewDetailCardProps {
  review: Review;
  onClick?: () => void;
}

const studyTimeMap: Record<string, string> = {
  WITHIN_ONE_WEEK: "1주 이내",
  WITHIN_ONE_MONTH: "1달 이내",
  WITHIN_THREE_MONTHS: "3달 이내",
  WITHIN_SIX_MONTHS: "6달 이내",
  WITHIN_ONE_YEAR: "1년 이내",
  INCOMPLETE: "미완료",
};

const ReviewDetailCard: React.FC<ReviewDetailCardProps> = ({ review, onClick }) => {
  const fullStars = Math.floor(review.rate);
  const hasHalfStar = review.rate % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const [status, setStatus] = useState<"none" | "like" | "dislike">("none");
  const [likesCount, setLikesCount] = useState(review.likes);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const mid = rect.width / 2;

    if (clickX < mid) {
      // 왼쪽 클릭: 싫어요 토글
      if (status === "dislike") {
        setStatus("none");
      } else {
        if (status === "like") setLikesCount(likesCount - 1);
        setStatus("dislike");
      }
    } else {
      // 오른쪽 클릭: 좋아요 토글
      if (status === "like") {
        setStatus("none");
        setLikesCount(likesCount - 1);
      } else {
        if (status === "dislike") setStatus("none");
        setStatus("like");
        setLikesCount(likesCount + 1);
      }
    }
  };

  const getButtonImage = () => {
    if (status === "like") return feedbackgood;
    if (status === "dislike") return feedbackbad;
    return feedback;
  };

  return (
    <div
      className="w-full max-w-[1290px] bg-white rounded-lg p-6 mb-4 shadow-md cursor-pointer"
      onClick={onClick}
    >
      {/* 1. 상단 아이콘 + 별점 */}
      <div className="flex items-center gap-3 mb-3">
        <img src={Logo} alt="Review logo" className="w-[20px] h-[20px]" />
        <div className="flex items-center">
          {[...Array(fullStars)].map((_, i) => (
            <span
              key={`full-${i}`}
              className="text-[20px]"
              style={{ color: "#B4D780", lineHeight: 1, verticalAlign: "middle", display: "inline-block" }}
            >
              ★
            </span>
          ))}
          {hasHalfStar && (
            <img
              key="half-star"
              src={halfStarImg}
              alt="반쪽별"
              className="inline-block"
              style={{
                width: 18,
                height: 18,
                verticalAlign: "text-bottom",
                display: "inline-block",
                marginTop: 5,
              }}
            />
          )}
          {[...Array(emptyStars)].map((_, i) => (
            <span
              key={`empty-${i}`}
              className="text-gray-300 text-[20px]"
              style={{ lineHeight: 1, verticalAlign: "middle", display: "inline-block" }}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      {/* 공부 기간, 좋아요, 작성일 */}
      <div className="flex items-center mb-3 text-sm text-gray-500">
        <div>공부 기간: {studyTimeMap[review.studyTime] || review.studyTime}</div>
        <div className="flex items-center gap-1 text-gray-600 text-sm ml-15 select-none">
          <img src={good} alt="좋아요" className="w-4 h-4" />
          <span>{likesCount}</span>
        </div>
        <div className="ml-auto">
          {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : "방금 전"}
        </div>
      </div>

      {/* 리뷰 내용 */}
      <p className="text-gray-800 whitespace-pre-wrap mb-3">{review.content}</p>

      {/* 리뷰 이미지 */}
      {review.imageUrl && (
        <div className="max-w-xs max-h-40 overflow-hidden rounded-lg mb-3">
          <img
            src={review.imageUrl}
            alt="리뷰 이미지"
            className="object-cover w-full h-full"
          />
        </div>
      )}

      {/* 좋아요/싫어요 버튼 */}
      <div className="select-none">
        <button
          type="button"
          onClick={handleClick}
          className="flex items-center gap-1 text-gray-600 hover:text-gray-900"
          style={{ width: 72, height: 32, padding: 0 }}
        >
          <img
            src={getButtonImage()}
            alt={status === "like" ? "좋아요" : status === "dislike" ? "싫어요" : "좋아요/싫어요"}
            className="w-full h-full object-contain"
          />
        </button>
      </div>
    </div>
  );
};

export default ReviewDetailCard;
