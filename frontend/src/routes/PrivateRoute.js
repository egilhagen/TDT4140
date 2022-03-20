import React from "react";
import { Route, Navigate } from "react-router-dom";
import { connect } from "react-redux";

/* Private Route, only show the component passed to PrivateRoute (children) if user is logged in, else send back to home page */

/* Eureka, det må vere redux som gjer at alerts blir kalla fleire ganger! component-state oppdateres når redux-state oppdateres! */

function PrivateRoute({ passedInComponent, auth }) {
  /* Dersom Redux held på å laste inn bruker, ELLER Redux-staten er tom, vis: Loading... */
  if (auth.isLoading || auth.isAuthenticated == null) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* TODO: Reactstrap Spinner, loading animation. veldig kult, men trur det var bedre med kun Loading... */}
        <div className="spinner-border text-primary" role="status"></div>
        <h3>Loading...</h3>
      </div>
    );
  } else if (!auth.isAuthenticated) {
    /* Dersom bruker ikkje er logget inn, redirect til startsida */
    /* TODO: kunne vert nice å få login til å poppe opp, redirect til /login */
    alert("Please log in to se your profile");
    return <Navigate to="/" />;
  } else {
    return <>{passedInComponent}</>;
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
