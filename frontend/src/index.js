import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// Our components
import ProfilePage from "./routes/ProfilePage";
import PrivateRoute from "./routes/PrivateRoute";

// React router, for å ha forskjellige url´s som /profile/username
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          {/* Profile page is a child route of home page, PrivateRoute is our component making sure redirect only works when logged in  */}

          <Route
            path="/profile"
            element={<PrivateRoute passedInComponent={<ProfilePage />} />}
          />

          {/* Default route */}
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here! You entered an invalid URL</p>
              </main>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
