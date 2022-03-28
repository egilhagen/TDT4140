import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// Our components
import ProfilePage from "./routes/ProfilePage";
import Profile from "./routes/Profile";
import PrivateRoute from "./routes/PrivateRoute";

// React router, for å ha forskjellige url´s som /profiles/username
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* App is parent route */}
        <Route path="/" element={<App />}>
          {/* Profile page is a child route of home page, PrivateRoute is our component making sure redirect only works when logged in  */}

          <Route
            path="/profiles"
            element={<PrivateRoute passedInComponent={<ProfilePage />} />}
          >
            {/* Index route, if no usernames match, go here? */}
            {/*   <Route
              index
              element={
                <main style={{ padding: "1rem" }}>
                  <p>No user found with that username</p>
                </main>
              }
            /> */}
            <Route path=":username" element={<Profile />} />
          </Route>

          {/* Default route */}
          <Route
            path="*"
            element={
              <main
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <h4>
                  There's nothing here! You entered an invalid URL
                  <br />
                  <Link to="/">Go back home</Link>
                </h4>
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
