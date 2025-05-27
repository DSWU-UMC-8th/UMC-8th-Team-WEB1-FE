import StarSection from "../../components/Review/ReviewSummaryPage";
import BannerSection from "../../components/Main/Banner";

import ReviewBottom from "../../components/Review/ReviewBottom";
import ReviewDetail from "../../components/Main/LatestReviewsList";

const Reviews = () => {
  return (
    <div className="bg-[#F7F8F9]">
      <BannerSection />
<StarSection />
<ReviewBottom />
<ReviewDetail />
    </div>
  );
};

export default Reviews;
