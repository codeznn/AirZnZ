// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
//import LoginFormPage from "./components/LoginFormPage";
//import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotsItems from "./components/SpotsItems";
import SpotDetails from "./components/SpotDetails";
import CreateSpot from "./components/CreateSpotForm";
import UpdateSpot from "./components/EditSpotForm";
import UpdateSpotForm from "./components/EditSpotForm";
import CreateReviewForm from "./components/ReviewForm";
import UserSpots from "./components/UserSpots";
import UserReviews from "./components/UserReviews";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <SpotsItems />
          </Route>
          <Route  exact path='/spots/:spotId'>
            <SpotDetails />
          </Route>
          <Route exact path='/new-spot'>
            <CreateSpot />
          </Route>
          <Route exact path='/my-spots'>
            <UserSpots />
          </Route>
          <Route exact path='/my-reviews'>
            <UserReviews />
          </Route>
          <Route path="/spots/:spotId/edit">
            <UpdateSpotForm />
          </Route>
          <Route path="/spots/:spotId/new-review">
            <CreateReviewForm />
          </Route>

        </Switch>
      )}
    </>
  );
}

export default App;
