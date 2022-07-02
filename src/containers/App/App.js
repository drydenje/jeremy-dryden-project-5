import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Feed from "containers/Feed";
import Header from "containers/Header";

import "./App.css";
import "./setup.css";

const App = () => {
  return (
    <Router>
      <div className="App">
        {/* Skip link */}
        {/* <a href="#maincontent" className="skip-link">
          Skip to main content.
        </a> */}
        <Header />
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route
            path="*"
            element={
              <main>
                <h2>Invalid Url</h2>
              </main>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
