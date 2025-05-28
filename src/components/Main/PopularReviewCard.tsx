import React from "react";
import halfStarImg from "../../assets/halfstar.png"; // 반쪽별 이미지 경로 맞게 수정

interface PopularReviewCardProps {
  reviewId: number;
  lectureTitle: string;
  rating: number;
  content: string;
  teacherName: string;
  teacherImage: string;
  onClick?: () => void;
}

const PopularReviewCard: React.FC<PopularReviewCardProps> = ({
  reviewId,
  lectureTitle,
  rating,
  content,
  teacherName,
  teacherImage,
  onClick,
}) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div
      className="bg-white rounded-2xl shadow-sm p-6 w-full max-w-sm border border-[#F7F8F9] cursor-pointer"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === "Enter") onClick?.();
      }}
    >
      <h3 className="text-lg font-bold mb-2">{lectureTitle}</h3>
      <div className="flex items-center mb-2">
        {/* 꽉 찬 별 */}
        {[...Array(fullStars)].map((_, i) => (
          <span
            key={`full-${i}`}
            className="text-xl"
            style={{ color: "#B4D780", width: "1em", textAlign: "center", lineHeight: 1 }}
          >
            ★
          </span>
        ))}

        {/* 반쪽 별 */}
        {hasHalfStar && (
          <img
            key="half-star"
            src={halfStarImg}
            alt="반쪽별"
            className="inline-block mb-0.5"
            style={{ width: 18, height: 18, marginLeft: 1, marginRight: 1, verticalAlign: "text-bottom" }}
          />
        )}

        {/* 빈 별 */}
        {[...Array(emptyStars)].map((_, i) => (
          <span
            key={`empty-${i}`}
            className="text-xl text-gray-300"
            style={{ width: "1em", textAlign: "center", lineHeight: 1 }}
          >
            ★
          </span>
        ))}
      </div>
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{content}</p>
      <div className="flex items-center gap-2">
        <img
          src={teacherImage}
          alt={teacherName}
          className="w-8 h-8 rounded-full object-cover"
        />
        <span className="text-sm font-medium">{teacherName}</span>
      </div>
    </div>
  );
};

export default PopularReviewCard;
