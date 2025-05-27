import React, { useState } from "react";
import ReviewListTop from "../../components/Review/ReviewListTop";
import PopularReviewsList from "../../components/Main/PopularReviewsListLong";

const ReviewPopular = () => {
  const [filters, setFilters] = useState({
    category: "",
    difficulty: "",
    entryPeriod: "",
  });

  return (
    <div className="bg-[#F7F8F9]">
      <ReviewListTop onFilterChange={setFilters} />
      <PopularReviewsList
        category={filters.category}
        difficulty={filters.difficulty}
        entryPeriod={filters.entryPeriod}
      />
    </div>
  );
};

export default ReviewPopular;
