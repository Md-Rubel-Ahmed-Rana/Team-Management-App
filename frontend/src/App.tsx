import { RouterProvider } from "react-router-dom";
import router from "./routes/routes";

function App() {
  return (
    <div className="lg:w-[1280px] mx-auto">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
