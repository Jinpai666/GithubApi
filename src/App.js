import  React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Main from "./components/Main";
import Favourites from "./components/Favourites"
import ErrorPage from "./components/ErrorPage";
import DetailsPage from "./components/DetailsPage";

function App() {



    return (
      <div className={"container"}>
          <Router>
              <Header/>
              <Routes>
                  <Route
                      path="/"
                      element={<Main/>}
                  />
                  <Route
                      path="favourites"
                      element={<Favourites/>}
                  />
                  <Route
                      path="/favourites/:id"
                      element={<DetailsPage/>}
                  />
                  <Route
                      path="*"
                      element={<ErrorPage/>}
                  />
              </Routes>
          </Router>
      </div>



  );
}

export default App;
