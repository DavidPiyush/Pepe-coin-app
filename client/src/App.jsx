import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary"; // Adjust path as necessary
import Layout from "./Layout.jsx"; // Import the Layout component
import Index from "./components/Index.jsx"; // Import the Index component
import Refer from "./components/Refer.jsx"; // Import the Refer component
import Navbar from "./components/Navbar.jsx"; // Import the Navbar component
import Hero from "./components/Hero.jsx"; // Import the Hero component
import Spinner from "./components/Spinner.jsx"; // Import the Spinner component

const App = () => {
  const [loading, setLoading] = useState(true);

  document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "F12" || (e.ctrlKey && e.shiftKey && e.key === "I")) {
      e.preventDefault();
    }
  });


  useEffect(() => {
    // Simulate loading process, e.g., fetching data or initializing
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after 1 second
    }, 1000);

    return () => clearTimeout(timer); // Clean up timer on component unmount
  }, []);

  return (
    <Router>
      <ErrorBoundary>
        {loading ? (
          <Spinner />
        ) : (
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route
                path="/refer/:id"
                element={
                  <>
                    <Navbar />
                    <Refer />
                  </>
                }
              />
              <Route index element={<Index />} />
              <Route
                path="/refers"
                element={
                  <>
                    <Navbar />
                    <Refer />
                  </>
                }
              />
              <Route index element={<Index />} />
              <Route
                path="/refer"
                element={
                  <>
                    <Navbar />
                    <Refer />
                  </>
                }
              />
              <Route
                path="/pepe"
                element={
                  <>
                    <Navbar />
                    <Hero />
                  </>
                }
              />
            </Route>
          </Routes>
        )}
      </ErrorBoundary>
    </Router>
  );
};

export default App;
