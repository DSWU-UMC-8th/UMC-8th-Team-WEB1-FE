import React from "react";

interface ReviewModalProps {
  type: "success" | "error" | "cancel";
  onClose: () => void;
  onConfirm: () => void;
}

const modalContent: Record<
  "success" | "error" | "cancel",
  {
    title: string;
    message: string;
    confirmText: string;
    cancelText?: string;
  }
> = {
  success: {
    title: "등록 성공",
    message: "강의평 등록에 성공했습니다!",
    confirmText: "확인",
  },
  error: {
    title: "등록 실패",
    message: "필수 항목을 모두 입력해 주세요.",
    confirmText: "확인",
  },
  cancel: {
    title: "정말 나가시겠습니까?",
    message: "작성 중인 내용은 저장되지 않습니다.",
    confirmText: "확인",
    cancelText: "취소",
  },
};

const ReviewModal: React.FC<ReviewModalProps> = ({
  type,
  onClose,
  onConfirm,
}) => {
  const content = modalContent[type];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
      <div className="bg-white rounded-xl p-6 w-[400px] shadow-lg">
        <h2 className="text-lg font-bold mb-4 text-gray-800">
          {content.title}
        </h2>
        <p className="mb-6 text-sm text-gray-600">{content.message}</p>
        <div className="flex justify-end gap-4">
          {type === "cancel" && content.cancelText && (
            <button
              className="px-5 py-2 text-sm font-medium border border-gray-300 rounded-xl text-gray-600 hover:bg-gray-100 transition"
              onClick={onClose}
            >
              {content.cancelText}
            </button>
          )}
          <button
            className="px-5 py-2 text-sm font-medium bg-[#B4D780] text-white rounded-xl hover:brightness-110 transition"
            onClick={onConfirm}
          >
            {content.confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
