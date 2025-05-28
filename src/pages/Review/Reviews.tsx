import StarSection from "../../components/Review/ReviewSummaryPage";
import BannerSection from "../../components/Main/Banner";

import ReviewBottom from "../../components/Review/ReviewBottom";
import Reviewdetail from "../../components/Review/ReviewDetail";

const Reviews = () => {
  return (
    <div className="bg-[#F7F8F9]">
      <BannerSection />
<StarSection />
<ReviewBottom />
<Reviewdetail />
    </div>
  );
};

export default Reviews;
