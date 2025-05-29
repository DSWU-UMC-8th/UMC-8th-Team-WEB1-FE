import { useState } from "react";
import ClassInfo from "../components/ReviewCreate/ClassInfo";
import WriteReview from "../components/ReviewCreate/WriteReview";
import ImageUploadBox from "../components/ReviewCreate/ImageUploadBox";
import ReviewModal from "../components/ReviewCreate/ReviewModal";
import { postReview } from "../api/reviewCreate";
import { StudyPeriod } from "../enums/StudyPeriod";
import type { ReviewRequest } from "../types/review";
import reservationIcon from "../assets/reservation.png";
const ReviewCreate = () => {
  const [lecture, setLecture] = useState("");
  const [instructors, setInstructors] = useState<string[]>([]);
  const [platform, setPlatform] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const [studyPeriod, setStudyPeriod] = useState<StudyPeriod>(
    StudyPeriod.WITHIN_A_WEEK
  );
  const [modal, setModal] = useState<"success" | "error" | "cancel" | null>(
    null
  );

  const getReviewRequest = (): ReviewRequest => ({
    lectureId: null,
    lecture: {
      name: lecture,
      instructorName: instructors[0] || "",
      platformId: null,
      level: "BEGINNER",
      category: "IT",
    },
    platformIds: [null],
    rating,
    content,
    studyPeriod,
  });

  const handleSubmit = async () => {
    try {
      const plainContent = content.replace(/<[^>]+>/g, "");
      const req = getReviewRequest();
      const response = await postReview(
        { ...req, content: plainContent },
        imageFile ?? undefined
      );
      console.log("성공:", response);
      setModal("success");
    } catch (e) {
      console.error(e);
      setModal("error");
    }
  };

  return (
    <div className="bg-[#f9f9f9] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">강의평 등록</h1>

        <ClassInfo
          lecture={lecture}
          onLectureChange={setLecture}
          instructors={instructors}
          setInstructors={setInstructors}
          platform={platform}
          onPlatformChange={setPlatform}
          imageFile={imageFile}
          setImageFile={setImageFile}
        />

        {/* 선택 항목: 이미지 업로드 */}
        <section className="w-full max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <img
              src={reservationIcon}
              alt="선택 항목 아이콘"
              className="w-6 h-6"
            />
            선택 항목
          </h2>
          <ImageUploadBox
            currentFile={imageFile}
            onImageUpload={setImageFile}
          />
        </section>

        <WriteReview
          rating={rating}
          setRating={setRating}
          content={content}
          setContent={setContent}
          studyPeriod={studyPeriod}
          setStudyPeriod={setStudyPeriod}
        />

        <div className="flex justify-center mt-10 gap-4">
          <button
            className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-lg"
            onClick={() => setModal("cancel")}
          >
            취소
          </button>
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg"
            onClick={handleSubmit}
          >
            등록
          </button>
        </div>

        {modal && (
          <ReviewModal
            type={modal}
            onClose={() => setModal(null)}
            onConfirm={() => {
              if (modal === "success") {
                window.location.href = "/";
              } else {
                setModal(null);
              }
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ReviewCreate;
