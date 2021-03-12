import React, { useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import GlobalState from "./GlobalState";
import * as EmailValidator from "email-validator";

import {Helmet} from "react-helmet";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import HttpsIcon from "@material-ui/icons/Https";

import { BrowserView, MobileView, isMobile } from "react-device-detect";

import AirplanemodeActiveIcon from "@material-ui/icons/AirplanemodeActive";
import {
  Backdrop,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Grid,
  TextField,
} from "@material-ui/core";

import thankyouImage from "./images/thank-you.png";

import LiveHelpIcon from "@material-ui/icons/LiveHelp";
import faq from "./FAQ";

import gynaeImage from "./images/gynae-clinic.png";
import BookService from "./services/BookService";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      {new Date().getFullYear()}{" "}
      <Link color="inherit" href="#">
        <strong> Medical Express Clinic </strong>
      </Link>
      {isMobile ? " " : " All rights reserved."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
    backgroundColor: "#fff",
    color: "#00a1c5",
    alignItems: "center",
  },

  logo: {
    maxWidth: 160,
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
    letterSpacing: "0.8px",
  },
  paper: {
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(1),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(0),
      marginBottom: theme.spacing(2),
      padding: theme.spacing(5),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },

  bold: {
    fontWeight: "800",
    padding: "5px",
  },

  doneImage: {
    width: "240px",
    height: "150px",
    margin: "20px",
  },

  logoImage: {
    width: "40px",
    height: "40px",
    marginLeft: "0px",
  },

  privacyButton: {
    marginBottom: "20px",
    width: "115px",
    color: "#fff",
    backgroundColor: "#444",
    "&:hover": {
      background: "#000",
      color: "#fff",
    },
  },

  faqButton: {
    marginBottom: "20px",
    marginLeft: "10px",
    backgroundColor: "#444",
    "&:hover": {
      background: "#000",
      color: "#fff",
    },
    width: "115px",
    color: "#fff",
  },

  textContent: {
    color: "#666f77",
    fontSize: "1.1rem",
    textAlign: "justify",
    paddingLeft: "30px",
    paddingRight: "30px",
    lineHeight: "2.2em",
    fontWeight: "400",
  },

  textContentMobile: {
    color: "#666f77",
    fontSize: "0.9rem",
    textAlign: "justify",
    paddingLeft: "30px",
    paddingRight: "30px",
    lineHeight: "1.5rem",
    fontWeight: "400",
  },

  getStartedButton: {
    marginTop: "10px",
    marginBottom: "10px",
  },

  AirIcon: {
    marginRight: "10px",
    fontSize: "32px",
  },

  pageTitle: {
    color: theme.palette.secondary.main,
    fontSize: "1.6rem",
    fontWeight: "600",
  },

  BookButton: {
    width: "100%",
    height: "50px",
    borderRadius: "30px",
    fontSize: "1.3rem",
    color: "#fff",
    fontWeight: "600",
    backgroundColor: theme.palette.secondary.main,
    cursor: "pointer",
    padding: "10px 20px",
    marginTop: "40px",
  },

  backdrop: {
    zIndex: 999,
    color: "#fff",
  },

  day: {
    width: "100%",
    padding: "10px",
    borderRadius: "30px",
    color : theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
    border: "1px solid",
    fontWeight: "500",
    cursor: "pointer",
    transition : "all 0.3s ease",
    "&:hover" :{
      backgroundColor : theme.palette.primary.main,
      color: "#fff"
    }
  },

  daySelected: {
    width: "100%",
    padding: "10px",
    borderRadius: "30px",
    backgroundColor : theme.palette.primary.main,
    color: "#fff",
    borderColor: theme.palette.primary.main,
    border: "1px solid",
    fontWeight: "500",
    cursor: "pointer",
  },

  
  time: {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    color : "#777",
    borderColor: "#777",
    border: "1px solid",
    fontWeight: "500",
    cursor: "pointer",
    transition : "all 0.3s ease",
    "&:hover" :{
      backgroundColor : theme.palette.primary.main,
      borderColor: theme.palette.primary.main,
      color: "#fff"
    }
  },

  timeSelected: {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    backgroundColor : theme.palette.primary.main,
    color: "#fff",
    borderColor: theme.palette.primary.main,
    border: "1px solid",
    fontWeight: "500",
    cursor: "pointer",
  },



  dayDisabled: {
    width: "100%",
    padding: "10px",
    borderRadius: "30px",
    backgroundColor : "#ddd",
    color: "#fff",
    fontWeight: "500",
    cursor: "not-allowed",
  },

  label:{
    fontWeight: "600",
    color : theme.palette.primary.main
  }


}));

export default function FinalResultsForm() {
  const [state, setState] = React.useContext(GlobalState);
  const classes = useStyles();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Helmet>
        <script>gtag_report_conversion ();</script>
      </Helmet>

      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "20px",
              marginTop: "20px",
            }}
          >
            <img src={thankyouImage} alt="Thank You" />
          </div>

          <div
            style={{
              marginTop: "20px",
              color: "#555",
              fontSize: "1.2rem",
              width: "100%",
              textAlign: "center",
              lineHeight: "2rem",
            }}
          >
            Your information has been submitted successfully.
          </div>

          <div
            style={{
              marginTop: "20px",
              marginBottom: "20px",
              color: "#555",
              fontWeight: "500",
              fontSize: "1.5rem",
              width: "100%",
              textAlign: "center",
              lineHeight: "3rem",
            }}
          >
            We will call you back soon! <br />{" "}
            <span className={classes.label}>{state.selectedDayLabel}</span>{" "}
            <br /> <span className={classes.label}>{state.selectedTime}</span>
          </div>
        </Paper>
      </main>
    </React.Fragment>
  );
}
