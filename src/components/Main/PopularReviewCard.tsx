import React from "react";

interface ReviewCardProps {
  lectureTitle: string;
  rating: number; // 0 ~ 5 (0.5 단위 가능)
  content: string;
  teacherName: string;
  teacherImage: string;
}

const PopularReviewCard: React.FC<ReviewCardProps> = ({
  lectureTitle,
  rating,
  content,
  teacherName,
  teacherImage,
}) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 w-full max-w-sm">
      <h3 className="text-lg font-bold mb-2">{lectureTitle}</h3>
      <div className="flex items-center mb-2">
        {[...Array(fullStars)].map((_, i) => (
          <span key={i} className="text-lime-400 text-xl">
            ★
          </span>
        ))}
        {hasHalfStar && <span className="text-lime-400 text-xl">☆</span>}
        {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
          <span key={`empty-${i}`} className="text-gray-300 text-xl">
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
