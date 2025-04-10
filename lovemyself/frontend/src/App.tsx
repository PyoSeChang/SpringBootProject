import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Layout from "./Layout";

import FindMySelfPage from "./pages/FindMySelfPage";
import DreamMySelfPage from "./pages/DreamMySelf";
import ReflectMySelfPage from "./pages/ReflectMySelf";
// import CognitionForm from "./features/cognition/CognitionForm"; // 기존에 사용하던 컴포넌트 예시

function App() {
  return (
      <Router>
          <Layout>
              <Routes>
                  <Route path="/find" element={<FindMySelfPage />} />
                  <Route path="/dream" element={<DreamMySelfPage />} />
                  <Route path="/reflect" element={<ReflectMySelfPage />} />
              </Routes>
          </Layout>
      </Router>
  );
}

export default App;
