import React, { useState } from "react";
import { Button, Grid } from "semantic-ui-react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import "./sign-in.css";
import { Link } from "react-router-dom";

const SignIn = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  const validateForm = () => {
    const newErrors = {};
    let valid = true;

    if (!values.email) {
      newErrors.email = true;
      valid = false;
    }

    if (!values.password) {
      newErrors.password = true;
      valid = false;
    }

    setErrors(newErrors);

    return valid;
  };

  const signin = async () => {
    if (validateForm()) {
      await signInWithEmailAndPassword(auth, values.email, values.password).then(
        () => {
          console.log("logged in");
          alert("You have logged in");
          window.location.href = "/";
        }
      );
    }
  };

  return (
    <div className="sign-in">
      <div>
        <Grid>
          <Grid.Column width={8}>
            <div>
              <Link to={"/"}>
                <Button>
                  <Button.Content visible>Home</Button.Content>
                </Button>
              </Link>
            </div>
          </Grid.Column>
          <Grid.Column width={8}>
            <div>
              <Link to={"/sign-up"}>
                <Button>
                  <Button.Content visible>SignUp</Button.Content>
                </Button>
              </Link>
            </div>
          </Grid.Column>
        </Grid>
      </div>
      <h1>Sign In</h1>
      <div className="ui fluid card">
        <div className="content">
          <div className="ui form">
            <div className={`field ${errors.email ? "error" : ""}`}>
              <label>Email</label>
              <input
                type="text"
                name="user"
                placeholder="User"
                onChange={(event) =>
                  setValues({ ...values, email: event.target.value })
                }
              />
              {errors.email && <div className="error-message">Email is required</div>}
            </div>
            <div className={`field ${errors.password ? "error" : ""}`}>
              <label>Password</label>
              <input
                type="password"
                name="pass"
                placeholder="Password"
                onChange={(event) =>
                  setValues({ ...values, password: event.target.value })
                }
              />
              {errors.password && <div className="error-message">Password is required</div>}
            </div>
            <button className="ui primary labeled icon button" onClick={signin}>
              <i className="unlock alternate icon"></i>
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
