import NotFound from "../assets/notfound.png";
import Navbar from "../components/Main/NavBar";

const NotFoundPage = () => {
  return (
    <div className="font-[Pretendard] h-[100vh] flex flex-col">
      <Navbar />
      <div className="flex-grow flex justify-center items-center">
        <img
          src={NotFound}
          alt="Not Found"
          className="w-[80%] object-contain"
        />
      </div>
    </div>
  );
};

export default NotFoundPage;
