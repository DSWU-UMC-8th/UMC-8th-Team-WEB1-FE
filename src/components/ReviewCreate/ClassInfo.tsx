import React from "react";
import reservationIcon from "../../assets/reservation.png";

interface ClassInfoProps {
  lecture: string;
  onLectureChange: (val: string) => void;
  instructors: string[];
  setInstructors: (val: string[]) => void;
  platform: string;
  onPlatformChange: (val: string) => void;
  imageFile: File | null;
  setImageFile: (val: File | null) => void;
}

const ClassInfo: React.FC<ClassInfoProps> = ({
  lecture,
  onLectureChange,
  instructors,
  setInstructors,
  platform,
  onPlatformChange,
}) => {
  const [inputValue, setInputValue] = React.useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      if (!instructors.includes(inputValue.trim())) {
        setInstructors([...instructors, inputValue.trim()]);
      }
      setInputValue("");
    }
  };

  const handleRemoveInstructor = (name: string) => {
    setInstructors(instructors.filter((i) => i !== name));
  };

  return (
    <section className="mb-12 w-full max-w-3xl mx-auto px-4">
      {/* 제목 */}
      <h2 className="text-2xl font-bold text-gray-800 mb-10 flex items-center gap-3">
        <img src={reservationIcon} alt="필수 항목 아이콘" className="w-6 h-6" />
        필수 항목
      </h2>

      {/* 강의명 */}
      <div className="mb-8">
        <label className="block text-base font-semibold text-gray-800 mb-2">
          강의명
        </label>
        <div className="flex gap-2">
          <div className="relative w-full">
            <input
              type="text"
              value={lecture}
              onChange={(e) => onLectureChange(e.target.value)}
              placeholder="강의명을 입력해 주세요."
              className="w-full p-4 pl-10 border border-gray-300 rounded-full text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#B4D780] bg-white"
            />
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </span>
          </div>
          <button className="px-6 py-2 rounded-md bg-[#B4D780] text-white font-semibold text-sm">
            검색
          </button>
        </div>
      </div>

      {/* 강사명 */}
      <div className="mb-8">
        <label className="block text-base font-semibold text-gray-800 mb-2">
          강사명
        </label>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="강사명을 입력해 주세요. (강의명 검색 시 자동 입력됩니다.)"
          className="w-full p-4 border border-gray-300 rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#B4D780] bg-white"
        />
        <div className="text-right text-xs text-gray-400 mt-1">(10자 이내)</div>
        <div className="flex flex-wrap gap-2 mt-2">
          {instructors.map((name) => (
            <span
              key={name}
              className="flex items-center gap-1 bg-[#E9F4D3] text-[#4A6333] px-3 py-1 rounded-full text-sm"
            >
              {name}
              <button
                type="button"
                onClick={() => handleRemoveInstructor(name)}
                className="text-xs hover:text-red-500"
              >
                ✕
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* 플랫폼 */}
      <div className="mb-8">
        <label className="block text-base font-semibold text-gray-800 mb-2">
          플랫폼
        </label>
        <div className="flex gap-2">
          <div className="relative w-full">
            <input
              type="text"
              value={platform}
              onChange={(e) => onPlatformChange(e.target.value)}
              placeholder="플랫폼을 검색해 주세요. (강의명 검색 시 자동 선택됩니다.)"
              className="w-full p-4 pl-10 border border-gray-300 rounded-full text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#B4D780] bg-white"
            />
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </span>
          </div>
          <button className="px-6 py-2 rounded-md bg-[#B4D780] text-white font-semibold text-sm">
            검색
          </button>
        </div>
      </div>
    </section>
  );
};

export default ClassInfo;
