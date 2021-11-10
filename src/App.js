import React, { useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import { Context } from ".";
import { useAuthState } from "react-firebase-hooks/auth";
import AppRouter from "./components/AppRouter";
import Loader from "./components/Loader";
import "./App.css";

const App = () => {
  const { auth } = useContext(Context);
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
};

export default App;
