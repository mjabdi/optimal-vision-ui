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
    backgroundColor: theme.palette.primary.main,
    cursor: "pointer",
    padding: "10px 20px",
    marginTop: "20px",
  },

  backdrop: {
    zIndex: 999,
    color: "#fff",
  },
}));

export default function WelcomeForm() {
  const [state, setState] = React.useContext(GlobalState);
  const classes = useStyles();

  //// ** Dialog

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [fullname, setFullname] = React.useState(state.fullname ?? "");
  const [email, setEmail] = React.useState(state.email ?? "");
  const [phone, setPhone] = React.useState(state.phone ?? "");

  const [faceChecked, setFaceChecked] = React.useState(false);
  const [telChecked, setTelChecked] = React.useState(false);

  const [saving, setSaving] = React.useState(false);

  const faceCheckClicked = (event) => {
    setFaceChecked(event.target.checked);
    setState((state) => ({ ...state, faceChecked: event.target.value }));
  };

  const telCheckClicked = (event) => {
    setTelChecked(event.target.checked);
    setState((state) => ({ ...state, telChecked: event.target.value }));
  };

  const fullnameChanged = (event) => {
    setFullname(event.target.value);
    setState((state) => ({ ...state, fullname: event.target.value }));
    if (event.target.value && event.target.value.trim().length > 0) {
      setState((state) => ({ ...state, fullnameError: false }));
    }
  };

  const emailChanged = (event) => {
    setEmail(event.target.value);
    setState((state) => ({ ...state, email: event.target.value }));
    if (event.target.value && EmailValidator.validate(event.target.value)) {
      setState((state) => ({ ...state, emailError: false }));
    }
  };

  const phoneChanged = (event) => {
    setPhone(event.target.value);
    setState((state) => ({ ...state, phone: event.target.value }));
    if (event.target.value && event.target.value.trim().length >= 6) {
      setState((state) => ({ ...state, phoneError: false }));
    }
  };

  const bookClicked = async () => {
    if (!validateBooking()) {
      return;
    }

    setSaving(true);

    try {
      const payload = {
        fullname: fullname,
        email: email,
        phone: phone,
        faceToFaceConsultation: faceChecked,
        telephoneConsultation: telChecked,
      };
      const res = await BookService.bookConsultation(payload);
      setSaving(false);
      if (res.data.status === "OK") {
        setState((state) => ({ ...state, booking: res.data.booking }));
        alert(res.data.booking._id);
      }
    } catch (err) {
      console.error(err);
      setSaving(false);
    }
  };

  const validateBooking = () => {
    let error = false;
    if (!fullname || fullname.length < 1) {
      setState((state) => ({ ...state, fullnameError: true }));
      error = true;
    }

    if (!email || !EmailValidator.validate(email)) {
      setState((state) => ({ ...state, emailError: true }));
      error = true;
    }

    if (!phone || phone.length < 5) {
      setState((state) => ({ ...state, phoneError: true }));
      error = true;
    }

    return !error;
  };

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
            <span className={classes.pageTitle}> Book a Consultation </span>
          </div>

          <Grid
            container
            spacing={2}
            alignItems="baseline"
            style={{ marginTop: "10px" }}
          >
            <Grid item xs={12}>
              <TextField
                error={state.fullnameError ? true : false}
                required
                id="full Name"
                label="Full Name"
                fullWidth
                autoComplete="name"
                value={fullname}
                onChange={fullnameChanged}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                error={state.emailError ? true : false}
                required
                id="email"
                label="Email Address"
                fullWidth
                autoComplete="email"
                type="email"
                value={email}
                onChange={emailChanged}
                variant="outlined"
                // helperText = 'This email address is where you will receive your results. Please tick the box below to confirm that this is a private email address to which you are happy for us to send your results.'
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                error={state.phoneError ? true : false}
                required
                id="phone"
                label="Contact Phone Number"
                fullWidth
                autoComplete="tel"
                value={phone}
                onChange={phoneChanged}
                variant="outlined"
              />
            </Grid>
          </Grid>
          <div
            style={{
              marginTop: "20px",
              color: "#555",
              fontSize: "1rem",
              width: "100%",
              textAlign: "left",
              lineHeight: "1.5rem",
            }}
          >
            Please choose your preference consultation:
          </div>

          <div
            style={{
              marginTop: "10px",
              color: "#777",
              fontSize: "1rem",
              width: "100%",
              textAlign: "left",
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  name="check1"
                  checked={faceChecked}
                  onChange={faceCheckClicked}
                />
              }
              label={
                <span style={{ fontSize: "1rem", color: "#999" }}>
                  {`Face to Face Consultation`}
                </span>
              }
            />
          </div>

          <div
            style={{
              marginTop: "0px",
              color: "#777",
              fontSize: "1rem",
              width: "100%",
              textAlign: "left",
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  name="check2"
                  checked={telChecked}
                  onChange={telCheckClicked}
                />
              }
              label={
                <span style={{ fontSize: "1rem", color: "#999" }}>
                  {`Telephone Consultation`}
                </span>
              }
            />
          </div>

          <div className={classes.BookButton} onClick={bookClicked}>
            Book Consultation
          </div>

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
          </div>

          <Backdrop className={classes.backdrop} open={saving}>
            <CircularProgress color="inherit" />
          </Backdrop>
        </Paper>
      </main>
    </React.Fragment>
  );
}
