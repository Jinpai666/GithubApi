import  React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Favourites from "./Favourites"
import ErrorPage from "./ErrorPage";
import DetailsPage from "./DetailsPage";

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
