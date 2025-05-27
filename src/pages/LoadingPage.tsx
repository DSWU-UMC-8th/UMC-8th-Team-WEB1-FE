import Default from "../assets/Default.png";

const LoadingPage = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-[#f7f8f9] font-[Pretendard]">
      <div className="relative w-24 h-24 mb-5">
        <div className="w-full h-full rounded-full border-8 border-gray-300 border-t-[#26cf9f] animate-spin"></div>
        <img
          src={Default}
          alt="로딩 아이콘"
          className="absolute top-1/2 left-1/2 w-10 h-10 -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      <h2 className="font-semibold text-lg text-gray-900 mb-1">
        잠시만 기다려주세요
      </h2>
      <p className="text-sm text-gray-500">데이터를 불러오는 중입니다.</p>
    </div>
  );
};

export default LoadingPage;
