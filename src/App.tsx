import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "@/routes/AppRoutes";

function App() {
  return (
    <>
      <BrowserRouter basename="/portifolio.github.io">
        <AppRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;
