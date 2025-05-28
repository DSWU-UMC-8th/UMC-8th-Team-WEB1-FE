import React, { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import LatestReviewCard from "./LatestReviewCard";
import LoadingPage from "../../pages/LoadingPage";
import noResultImg from "../../assets/noResultImg.png";

interface Review {
  reviewId: number;
  rate: number;
  studyTime: string;
  likes: number;
  content: string;
  imageUrl: string | null;
  createdAt: string | null;
  lectureName: string;
  teacher: string;
}

interface Option {
  label: string;
  value: string;
}

const sortByOptions: Option[] = [
  { label: "평점순", value: "rating" },
  { label: "최신순", value: "createdAt" },
  { label: "인기순", value: "likes" },
];

const directionOptions: Option[] = [
  { label: "오름차순", value: "asc" },
  { label: "내림차순", value: "desc" },
];

const Dropdown: React.FC<{
  options: Option[];
  selected: string;
  onChange: (value: string) => void;
  placeholder: string;
}> = ({ options, selected, onChange, placeholder }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  const selectedLabel =
    options.find((opt) => opt.value === selected)?.label || placeholder;

  return (
    <div
      className="relative w-40 cursor-pointer select-none"
      ref={ref}
      onClick={() => setOpen((prev) => !prev)}
    >
      <div className="border border-gray-300 rounded-md px-3 py-2 flex justify-between items-center bg-white">
        <span>{selectedLabel}</span>
        <svg
          className={`w-4 h-4 ml-2 text-gray-600 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
      {open && (
        <div className="absolute top-full left-0 mt-1 w-full bg-white rounded-md shadow-lg z-10 max-h-56 overflow-y-auto border border-gray-300">
          {options.map((opt) => (
            <div
              key={opt.value}
              className={`px-4 py-2 cursor-pointer hover:bg-[#F3F3F3] ${
                selected === opt.value ? "bg-[#F3F3F3]" : ""
              }`}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ReviewSearchResultList: React.FC = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const navigate = useNavigate();

  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [sortBy, setSortBy] = useState("");
  const [direction, setDirection] = useState("");

  const fetchReviewSearchResults = async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      params.append("keyword", keyword);
      params.append("sortBy", sortBy);
      params.append("direction", direction);
      params.append("pageNumber", "0");
      params.append("size", "20");

      const response = await fetch(
        `${
          import.meta.env.VITE_SERVER_API_URL
        }/api/reviews/search?${params.toString()}`
      );

      if (!response.ok) {
        throw new Error(`API 오류: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setReviews(data.result || []);
    } catch (err: any) {
      setError(err.message || "알 수 없는 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (keyword) {
      fetchReviewSearchResults();
    }
  }, [keyword, sortBy, direction]);

  if (loading) return <LoadingPage />;
  if (error)
    return (
      <p className="text-center py-10 text-red-600" role="alert">
        {error}
      </p>
    );
  if (reviews.length === 0)
    return (
      <section className="flex flex-col items-center justify-center h-[90vh] text-center px-4">
        <img
          src={noResultImg}
          alt="검색 결과 없음"
          className="w-32 h-32 mb-4 opacity-80"
        />
        <p className="text-lg font-semibold text-gray-700">
          <span className="text-[#00ac49]">‘{keyword}’</span>에 대한 검색 결과가
          없습니다.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          다른 키워드로 검색해 보세요.
        </p>
      </section>
    );

  return (
    <section className="my-4 mx-auto w-[87%] min-h-[100vh]">
      <div className="flex justify-center items-center mb-6">
        <h2 className="text-2xl font-semibold text-[#00ac49]">
          {keyword}
          <span className="text-2xl font-semibold text-black">
            {" "}
            에 대한 검색 결과입니다.
          </span>
        </h2>
      </div>
      <div className="flex gap-4 mb-6">
        <Dropdown
          options={sortByOptions}
          selected={sortBy}
          onChange={setSortBy}
          placeholder="정렬 기준"
        />
        <Dropdown
          options={directionOptions}
          selected={direction}
          onChange={setDirection}
          placeholder="정렬 순서"
        />
      </div>

      <div className="flex flex-col gap-4">
        {reviews.map((review) => (
          <LatestReviewCard
            key={review.reviewId}
            review={review}
            onClick={() => navigate(`/reviews/${review.reviewId}`)}
          />
        ))}
      </div>
    </section>
  );
};

export default ReviewSearchResultList;
