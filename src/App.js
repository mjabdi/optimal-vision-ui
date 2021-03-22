import "./App.css";
import WelcomeForm from "./WelcomeForm";
import GlobalState from "./GlobalState";
import React, { useEffect } from "react";
import theme from "./theme";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import GlobalStyles from "./GlobalStyles";
import DateTimeForm from "./DateTimeForm";
import FinalResultsForm from "./FinalResultsForm";

const getReferrer = () => {
  let search = window.location.search;
  if (search && search.indexOf("?ref=") === 0)
  {
    return search.substr(5)
  }


  return "";
};

function App() {
  const [state, setState] = React.useState({
    activeStep: 0,
    bookingDate: null,
    persons: [],
  });

  useEffect(() => {

    const referrer = getReferrer()
    setState(state => ({...state, referrer : referrer}))

  }, []);

  return (
    <GlobalState.Provider value={[state, setState]}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        <div className="App">
          {!state.booking && <WelcomeForm />}
          {state.booking && !state.finished && <DateTimeForm />}
          {state.booking && state.finished && <FinalResultsForm />}
        </div>
      </MuiThemeProvider>
    </GlobalState.Provider>
  );
}

export default App;
