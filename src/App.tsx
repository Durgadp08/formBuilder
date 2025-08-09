import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import Create from "./components/create";
import Preview from "./components/preview";
import Myform from "./components/myform";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/create" element={<Create />} />
          <Route path="/preview" element={<Preview />} />
          <Route path="/myforms" element={<Myform />} />
          <Route />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
