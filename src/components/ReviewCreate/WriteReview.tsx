import React from "react";
import type { StudyPeriod } from "../../enums/StudyPeriod";
import reservationIcon from "../../assets/reservation.png";

interface WriteReviewProps {
  rating: number;
  setRating: (val: number) => void;
  content: string;
  setContent: (val: string) => void;
  studyPeriod: StudyPeriod;
  setStudyPeriod: (val: StudyPeriod) => void;
}

const WriteReview: React.FC<WriteReviewProps> = ({
  rating,
  setRating,
  content,
  setContent,
  studyPeriod,
  setStudyPeriod,
}) => {
  return (
    <section className="w-full max-w-3xl mx-auto px-4 mb-12">
      {/* 제목 */}
      <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-2">
        <img src={reservationIcon} alt="아이콘" className="w-5 h-5" />
        리뷰 작성
      </h2>

      {/* 별점 */}
      <div className="mb-10">
        <label className="block text-lg font-semibold text-gray-800 mb-2">
          별점
        </label>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min={0}
            max={5}
            step={1}
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-full accent-[#B4D780]"
          />
          <span className="text-sm text-gray-600">{rating}/5</span>
        </div>
      </div>

      {/* 강의평 */}
      <div className="mb-10">
        <label className="block text-xl font-semibold text-gray-800 mb-4">
          강의평
        </label>
        <textarea
          placeholder="이 강의에 대한 총평을 작성해주세요 (100자 이내). 욕설, 비하적인 말은 지양해주세요."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
          className="w-full p-5 border border-gray-300 rounded-md text-gray-800 resize-none focus:ring-2 focus:ring-[#B4D780] bg-white"
        />
      </div>

      {/* 수강 기간 */}
      <div className="mb-10">
        <label className="block text-xl font-semibold text-gray-800 mb-4">
          강의를 다 듣는데 얼마나 걸렸나요?
        </label>
        <div className="border border-gray-300 rounded-2xl p-6 space-y-4 bg-white">
          {[
            { label: "일주일 이내", value: "WITHIN_A_WEEK" },
            { label: "1달 이내", value: "WITHIN_A_MONTH" },
            { label: "3달 이내", value: "OVER_A_MONTH" },
            { label: "6달 이내", value: "SIX_MONTHS" },
            { label: "1년 이내", value: "WITHIN_A_YEAR" },
            { label: "수강 미완료", value: "INCOMPLETE" },
          ].map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-3 text-base text-gray-800"
            >
              <input
                type="radio"
                name="studyPeriod"
                value={option.value}
                checked={studyPeriod === option.value}
                onChange={() => setStudyPeriod(option.value as StudyPeriod)}
                className="w-5 h-5 accent-[#B4D780]"
              />
              {option.label}
            </label>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WriteReview;
