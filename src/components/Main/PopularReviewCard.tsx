// import React from "react";

// const starStyle = {
//   color: "#B4D780",
// };

// const starBorderStyle = {
//   color: "transparent",
//   WebkitTextStroke: "1px #B4D780", // 회색 테두리
//   position: "relative" as const,
//   display: "inline-block",
//   width: "1em",
//   textAlign: "center" as const,
// };

// const halfStarFillStyle = {
//   position: "absolute" as const,
//   overflow: "hidden",
//   width: "50%",
//   top: 0,
//   left: 0,
//   color: "#B4D780",
//   WebkitTextStroke: "0",
// };

// const PopularReviewCard: React.FC<ReviewCardProps> = ({
//   lectureTitle,
//   rating,
//   content,
//   teacherName,
//   teacherImage,
// }) => {
//   const fullStars = Math.floor(rating);
//   const hasHalfStar = rating - fullStars >= 0.5;

//   return (
//     <div className="bg-white rounded-2xl shadow-sm p-6 w-full max-w-sm border border-[#F7F8F9]">
//       <h3 className="text-lg font-bold mb-2">{lectureTitle}</h3>
//       <div className="flex items-center mb-2">
//         {/* 꽉 찬 별 */}
//         {[...Array(fullStars)].map((_, i) => (
//           <span key={i} style={starStyle} className="text-xl">
//             ★
//           </span>
//         ))}

//         {/* 반쪽 별 */}
//         {hasHalfStar && (
//           <span key="half-star" style={starBorderStyle}>
//             <span style={halfStarFillStyle}>★</span>★
//           </span>
//         )}

//         {/* 빈 별 */}
//         {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
//           <span key={`empty-${i}`} style={starBorderStyle} className="text-xl">
//             ★
//           </span>
//         ))}
//       </div>

//       <p className="text-gray-600 text-sm mb-4 line-clamp-2">{content}</p>
//       <div className="flex items-center gap-2">
//         <img
//           src={teacherImage}
//           alt={teacherName}
//           className="w-8 h-8 rounded-full object-cover"
//         />
//         <span className="text-sm font-medium">{teacherName}</span>
//       </div>
//     </div>
//   );
// };

// export default PopularReviewCard;

import React from "react";

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
      {" "}
      <h3 className="text-lg font-bold mb-2">{lectureTitle}</h3>
      <div className="flex items-center mb-2">
        {/* 꽉 찬 별 */}
        {[...Array(fullStars)].map((_, i) => (
          <span
            key={i}
            className="text-xl relative inline-block text-[#B4D780] [webkit-text-stroke:1px_#B4D780]"
            style={{ width: "1em", textAlign: "center" }}
          >
            ★
          </span>
        ))}

        {/* 반쪽 별 */}
        {hasHalfStar && (
          <span
            key="half-star"
            className="relative inline-block text-xl text-transparent
               [webkit-text-stroke:1px_#B4D780] w-4 text-center"
            style={{ width: "1em" }}
          >
            {/* 반쪽 색 채움 */}
            <span
              className="absolute overflow-hidden top-0 left-0 w-1/2 h-full
                 text-[#B4D780] [webkit-text-stroke:0]"
            >
              ★
            </span>
            ★
          </span>
        )}

        {/* 빈 별 */}
        {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
          <span
            key={`empty-${i}`}
            className="text-xl text-transparent
               [webkit-text-stroke:1px_#B4D780] relative inline-block w-4 text-center"
            style={{ width: "1em" }}
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
