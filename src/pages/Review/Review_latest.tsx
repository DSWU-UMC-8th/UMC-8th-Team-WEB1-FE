import React, { useState } from "react";
import ReviewListTop from "../../components/Review/ReviewListTop";
import LatestReviewsList from "../../components/Main/LatestReviewsList";

const ReviewLatest = () => {
  const [filters, setFilters] = useState({
    category: "",
    difficulty: "",
    entryPeriod: "",
  });

  return (
    <div className="bg-[#F7F8F9]">
      <ReviewListTop onFilterChange={setFilters} />
      <LatestReviewsList
        category={filters.category}
        difficulty={filters.difficulty}
        entryPeriod={filters.entryPeriod}
      />
    </div>
  );
};

export default ReviewLatest;
