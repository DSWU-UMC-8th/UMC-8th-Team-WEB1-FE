import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import NotFoundPage from "./pages/NotFoundPage";
import Main from "./pages/Main";
import Reviews from "./pages/Review/Reviews";
import ReviewLatest from "./pages/Review/Review_latest";
import ReviewPopular from "./pages/Review/Review_popular";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      
        {
        path: "reviews/latest",  
        element: <ReviewLatest />,
      },
       {
        path: "reviews/popular",  
        element: <ReviewPopular />,
      },
  
        {
        path: "reviews/:reviewId",  
        element: <Reviews />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
