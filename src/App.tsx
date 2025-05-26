import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import NotFoundPage from "./pages/NotFoundPage";
import Main from "./pages/Main";
import Reviews from "./pages/Review/Reviews";

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
        path: "review",
        element: <Reviews />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
