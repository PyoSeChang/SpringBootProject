// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FindMySelfPage from "./pages/FindMySelfPage";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/find" element={<FindMySelfPage />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;

