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

import logoImage from "./images/logo.png";

import LiveHelpIcon from "@material-ui/icons/LiveHelp";
import faq from "./FAQ";

import gynaeImage from "./images/gynae-clinic.png";
import BookService from "./services/BookService";

import "./badge.css"

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
    fontSize: "2rem",
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
    marginTop: "30px",
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
    border: "3px solid",
    fontWeight: "700",
    fontSize:"1.5rem",
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
    border: "3px solid",
    fontWeight: "700",
    fontSize:"1.5rem",
    cursor: "pointer",
  },

  
  time: {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    color : theme.palette.secondary.main,
    borderColor: theme.palette.secondary.main,
    border: "2px solid",
    fontWeight: "700",
    cursor: "pointer",
    transition : "all 0.3s ease",
    "&:hover" :{
      backgroundColor : theme.palette.secondary.main,
      borderColor: theme.palette.secondary.main,
      color: "#fff"
    }
  },

  timeSelected: {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    backgroundColor :theme.palette.secondary.main,
    color: "#fff",
    borderColor: theme.palette.secondary.main,
    border: "2px solid",
    fontWeight: "700",
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


}));

export default function DateTimeForm() {
  const [state, setState] = React.useContext(GlobalState);
  const classes = useStyles();


  //// ** Dialog

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [saving, setSaving] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState(null)

  const [selectedTime, setSelectedTime] = React.useState(null)

  const dayClicked = (date, dayLabel) => {
    setSelectedDate(date)
    setSelectedTime(null)
    setState(state => ({...state, selectedDayLabel: dayLabel }))
  }

  const timeClicked = (time) => {
    setSelectedTime(time)
    setState(state => ({...state, selectedTime: time }))
  }

  const submitClicked = async () =>
  {

    if (!selectedDate || !selectedTime)
      return
    
    setSaving(true)

    try {
      const res = await BookService.setDateTime(state.booking._id, selectedDate, selectedTime)
      setSaving(false)
      if (res.data.status === "OK")
      {
        setState(state => ({...state, finished: true, }))
      }
    }
    catch(err)
    {
      console.error(err)
      setSaving(false)
    }
  }
  
  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            <span className={classes.pageTitle}> Thank You!</span>
          </div>

          <div
            style={{
              marginTop: "20px",
              color: "#555",
              fontSize: "1rem",
              width: "100%",
              textAlign: "center",
              lineHeight: "1.5rem",
            }}
          >
            Your information has been submitted successfully.
          </div>

          <div
            style={{
              marginTop: "10px",
              color: "#555",
              fontSize: "1rem",
              width: "100%",
              textAlign: "center",
              lineHeight: "1.8rem",
            }}
          >
            In order to help us to <strong>call you back</strong> at a time you
            prefer, please choose a time below:
          </div>

          {state.timeData && state.timeData.status === "OK" && (
            <React.Fragment>
              <Grid container spacing={2} style={{ marginTop: "20px" }}>
                {state.timeData.days.map((day) => (
                  <Grid item xs={12} sm={6} hidden={!day.available}>
                    <div
                      className={
                        day.available
                          ? day.date === selectedDate
                            ? classes.daySelected
                            : classes.day
                          : classes.dayDisabled
                      }
                      onClick={() =>
                        day.available ? dayClicked(day.date, day.dayLabel) : null
                      }
                    >
                      {day.dayLabel}
                    </div>
                  </Grid>
                ))}
              </Grid>

              {selectedDate && (
                <React.Fragment>
                  <div  style={{ marginTop: "20px", fontWeight:"500", textAlign:"center" }}>
                    Please choose your preferred time :
                  </div>
                  <Grid container spacing={2} style={{ marginTop: "10px" }}>
                    {state.timeData.defaultTimes.map((time,index) => (
                      <Grid item xs={12} sm={6} hidden={selectedDate === state.timeData.days[0].date  && index < state.timeData.firstTimeIndex}>
                        <div
                          className={
                            time === selectedTime
                              ? classes.timeSelected
                              : classes.time
                          }
                          onClick={() => timeClicked(time)}
                        >
                          {time}
                        </div>
                      </Grid>
                    ))}
                  </Grid>
                </React.Fragment>
              )}
            </React.Fragment>
          )}

          <div style={{display:"flex", justifyContent:"center", marginTop:"30px"}}>
              <div class="discount-label red"> <span>NOW Up-to £1000 off * </span> </div>
          </div>

          <div className={classes.BookButton} onClick={() => submitClicked()}>Submit</div>

          <div
            style={{
              marginTop: "20px",
              color: "#999",
              fontSize: "0.8rem",
              width: "100%",
              textAlign: "left",
            }}
          >
            We will never share your data with 3rd parties for marketing
            purposes. For more information about how Optimal Vision uses, shares
            and protects your personal data, see our
            <a
              href="https://www.optimalvision.co.uk/privacy-policy"
              target="_blank"
              style={{ color: "#777", marginLeft: "5px" }}
            >
              Privacy Policy
            </a>

            <p style={{color:"#f25d00", fontWeight:"600"}}>
            * Your total surgery cost during this month
            </p>
          </div>

          <Backdrop className={classes.backdrop} open={saving}>
            <CircularProgress color="inherit" />
          </Backdrop>
        </Paper>
      </main>
    </React.Fragment>
  );
}
