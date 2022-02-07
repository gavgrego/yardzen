import { Button, Grid, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/LogoNew.png";
import "./styles.scss";

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Grid
      className="welcome"
      container
      justifyContent="center"
      direction="column"
      spacing={4}
    >
      <Grid item>
        <Typography variant="h1" align="center">
          Yardzen Budget Calculator
        </Typography>
      </Grid>
      <Grid item>
        {/* formik is a little overkill here but makes it easy to grab form values without creating more state to hold them */}
        <Formik
          initialValues={{ budget: "" }}
          onSubmit={(values, { setSubmitting }) => {
            navigate("budget", { state: values.budget });
            setSubmitting(false);
          }}
        >
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <Grid
                container
                spacing={2}
                direction="column"
                alignItems="center"
              >
                <Grid item>
                  <TextField
                    required
                    name="budget"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.budget}
                    inputProps={{
                      inputMode: "numeric",
                      pattern: "[0-9]*",
                    }}
                    InputProps={{
                      startAdornment: "$",
                    }}
                    helperText="Please enter your budget"
                  />
                </Grid>

                <Grid item>
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Submit Your Budget
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </Grid>
      <Grid sx={{ padding: 0 }} className="logo">
        <img alt="Yardzen logo" width="150" src={logo} />
      </Grid>
    </Grid>
  );
};

export default Welcome;
