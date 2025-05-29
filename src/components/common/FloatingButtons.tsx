import { useNavigate } from "react-router-dom";
import CreateIcon from "../../assets/floating-create.png";
import ArrowIcon from "../../assets/floating-up.png";

const FloatingButtons = () => {
  const navigate = useNavigate();

  // 1. 위로 스크롤
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 2. 리뷰 작성 페이지로 이동
  const goToCreate = () => {
    scrollToTop(); // 부드럽게 위로 올라간 후
    navigate("/create");
  };

  return (
    <div className="flex flex-col gap-2 fixed right-5 bottom-5 z-[1000]">
      {/* 리뷰 작성 버튼 */}
      <img
        src={CreateIcon}
        alt="리뷰 작성"
        className="w-[72px] h-[72px] object-contain cursor-pointer"
        onClick={goToCreate}
      />

      {/* 위로 가는 버튼 */}
      <img
        src={ArrowIcon}
        alt="맨 위로"
        className="w-[72px] h-[72px] object-contain cursor-pointer"
        onClick={scrollToTop}
      />
    </div>
  );
};

export default FloatingButtons;
