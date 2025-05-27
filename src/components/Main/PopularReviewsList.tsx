import ReviewCard from "./PopularReviewCard";
import profileImg from "../../assets/mainporfile.svg"; // 예시 이미지 경로

const PopularReviewsList = () => {
  const reviewList = [
    {
      lectureTitle: "강의명",
      rating: 4.5,
      content:
        "리뷰입니다. 리뷰입니다. 리뷰입니다. 리뷰입니다. 리뷰입니다. 리뷰입니다. 리뷰리뷰. 여기까지만 보입니다...",
      teacherName: "강사명",
      teacherImage: profileImg,
    },
    {
      lectureTitle: "강의명",
      rating: 4.5,
      content:
        "리뷰입니다. 리뷰입니다. 리뷰입니다. 리뷰입니다. 리뷰입니다. 리뷰입니다. 리뷰리뷰. 여기까지만 보입니다...",
      teacherName: "강사명",
      teacherImage: profileImg,
    },
  ];

  return (
    <div className="px-4 py-8 bg-[#f7f8f9]">
      <h2 className="text-2xl font-semibold mb-6">인기 리뷰</h2>
      <div className="flex flex-wrap gap-6">
        {reviewList.map((review, index) => (
          <ReviewCard key={index} {...review} />
        ))}
      </div>
    </div>
  );
};

export default PopularReviewsList;
