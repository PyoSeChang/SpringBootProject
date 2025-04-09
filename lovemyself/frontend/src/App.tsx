import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import FindMySelfPage from "./pages/FindMySelfPage";
// import CognitionForm from "./features/cognition/CognitionForm"; // 기존에 사용하던 컴포넌트 예시

function App() {
  return (
      <Router>
        <nav style={{ marginBottom: "1rem" }}>
          {/* 페이지 간 네비게이션을 위한 링크 */}
          <Link to="/find" style={{ marginRight: "1rem" }}>Find MySelf Page</Link>
          <Link to="/cognition">Cognition Form</Link>
        </nav>

        <Routes>
          {/* 각 Route에서 path와 element 설정 */}
          <Route path="/find" element={<FindMySelfPage />} />
          {/* 초기 경로나 기타 경로는 필요에 따라 추가 */}
        </Routes>
      </Router>
  );
}

export default App;
