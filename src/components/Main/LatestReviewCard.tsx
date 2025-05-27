import React, { useState, MouseEvent } from "react";
import Logo from "../../assets/Default.png";
import feedback from "../../assets/feedback.png"; // 기본 상태 (아직 안눌린 상태)
import feedbackbad from "../../assets/feedback-bad.png"; // 싫어요 눌린 상태
import feedbackgood from "../../assets/feedback-good.png"; // 좋아요 눌린 상태
import good from "../../assets/good.png";

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

  // 상태: liked(좋아요), disliked(싫어요), none(둘다 안눌림)
  const [status, setStatus] = useState<"none" | "like" | "dislike">("none");
  // 좋아요 수 상태, 초기값은 props.likes + (like면 +1, dislike면 0, none면 0)
  const [likesCount, setLikesCount] = useState(review.likes);

  // 이미지 클릭 시 좌우 영역 구분해서 상태 변경 및 좋아요 수 조정
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const mid = rect.width / 2;

    if (clickX < mid) {
      // 왼쪽 클릭 → 싫어요 토글
      if (status === "dislike") {
        setStatus("none");
      } else {
        // 싫어요 눌리면 좋아요 취소, 좋아요 수 줄이기
        if (status === "like") setLikesCount(likesCount - 1);
        setStatus("dislike");
      }
    } else {
      // 오른쪽 클릭 → 좋아요 토글
      if (status === "like") {
        setStatus("none");
        setLikesCount(likesCount - 1);
      } else {
        // 좋아요 눌리면 싫어요 취소, 좋아요 수 늘리기
        if (status === "dislike") setStatus("none");
        setStatus("like");
        setLikesCount(likesCount + 1);
      }
    }
  };

  // 상태에 따른 버튼 이미지 선택
  const getButtonImage = () => {
    if (status === "like") return feedbackgood;
    if (status === "dislike") return feedbackbad;
    return feedback;
  };

  return (
    <div className="w-full max-w-[1290px] bg-white rounded-[16.83px] p-[24px] mb-[16px] shadow-md">
      {/* 1. 상단 아이콘 + 별점 */}
      <div className="flex items-center gap-3 mb-3">
        <img src={Logo} alt="Review logo" className="w-[20px] h-[20px]" />
        <div className="flex items-center">
          {[...Array(fullStars)].map((_, i) => (
            <span key={`full-${i}`} className="text-lime-400 text-[20px] leading-none">
              ★
            </span>
          ))}
          {hasHalfStar && (
            <span className="text-lime-400 text-[20px] leading-none">☆</span>
          )}
          {[...Array(emptyStars)].map((_, i) => (
            <span key={`empty-${i}`} className="text-gray-300 text-[20px] leading-none">
              ★
            </span>
          ))}
        </div>
      </div>

      {/* 2. 공부 기간 + 좋아요 영역 */}
      <div className="flex items-center mb-3">
        <span className="ml-8 text-gray-500 text-sm whitespace-nowrap">
          공부 기간: {studyTimeMap[review.studyTime] || review.studyTime}
        </span>
        <div className="flex items-center gap-1 text-gray-600 text-sm ml-15 select-none">
          <img src={good} alt="좋아요" className="w-4 h-4" />
          <span>{likesCount}</span>
        </div>
        <span className="ml-8 text-gray-500 text-sm ml-auto whitespace-nowrap">방금 전</span>
      </div>

      {/* 3. 리뷰 내용 */}
      <div className="mb-3">
        <p className="ml-8 text-gray-800 whitespace-pre-wrap leading-relaxed text-sm font-bold">
          {review.content}
        </p>
      </div>

      {/* 리뷰 이미지 */}
      {review.imageUrl && (
        <div className="mb-3">
          <img
            src={review.imageUrl}
            alt="Review image"
            className="max-w-full rounded-lg object-contain"
          />
        </div>
      )}

      {/* 4. 하단 좋아요/싫어요 버튼 (이미지 하나, 좌우 클릭 구분) */}
      <div className="ml-8 flex items-center gap-4 pt-2 select-none">
        <button
          type="button"
          className="flex items-center gap-1 text-gray-600 hover:text-gray-900"
          onClick={handleClick}
          style={{ width: 72, height: 32, padding: 0 }} // 필요시 크기 조절
        >
          <img
            src={getButtonImage()}
            alt={status === "like" ? "좋아요" : status === "dislike" ? "싫어요" : "좋아요/싫어요"}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </button>
      </div>
    </div>
  );
};

export default LatestReviewCard;
