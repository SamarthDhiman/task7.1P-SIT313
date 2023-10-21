import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Button, Grid } from "semantic-ui-react";
import { auth } from "../firebase";
import "./sign-up.css";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

const d = new Date();

const SignUp = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmpass: "",
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    password: false,
    confirmpass: false,
  });

  const [error, setError] = useState(""); // New state for general error message

  const validateEmail = (email) => {
    // Regular expression for validating email format
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const signup = async () => {
    if (values.password === values.confirmpass) {
      if (values.name && values.email && values.password) {
        if (values.password.length >= 6) {
          setError(""); // Reset the general error message

          // Reset error state for individual fields
          setErrors({
            name: false,
            email: false,
            password: false,
            confirmpass: false,
          });

          if (!validateEmail(values.email)) {
            setError("Email format is not correct.");
            setErrors({ ...errors, email: true });
            return;
          }

          try {
            await createUserWithEmailAndPassword(
              auth,
              values.email,
              values.password
            );

            await addDoc(collection(db, "users"), {
              name: values.name,
              email: values.email,
              password: values.password,
              timestamp: d.toLocaleTimeString(),
            });

            console.log("signed up!");
            window.location.href = "/sign-in";
            auth.currentUser.displayName = values.name;
          } catch (error) {
            setError("An error occurred. Please try again.");
          }
        } else {
          setError("Password should be at least 6 characters.");
          setErrors({ ...errors, password: true });
        }
      } else {
        setError("Please fill in all the required fields.");
        // Set error state for individual fields
        setErrors({
          name: !values.name,
          email: !values.email,
          password: !values.password,
          confirmpass: !values.confirmpass,
        });
      }
    } else {
      setError("Passwords are not the same!");
      setErrors({ ...errors, confirmpass: true });
    }
  };

  return (
    <div className="sign-up">
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
            <Link to={"/sign-in"}>
              <Button>
                <Button.Content visible>Login</Button.Content>
              </Button>
            </Link>
          </div>
        </Grid.Column>
      </Grid>

      <h1>Sign Up</h1>
      <div className="ui fluid card">
        <div className="content">
          <div className="ui form">
            <div className={`field ${errors.name ? "error" : ""}`}>
              <label>Name</label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                onChange={(event) =>
                  setValues({ ...values, name: event.target.value })
                }
              />
              <div className="error-message">
                {errors.name && "Name is required."}
              </div>
            </div>
            <div className={`field ${errors.email ? "error" : ""}`}>
              <label>Email</label>
              <input
                type="text"
                name="user"
                placeholder="Email@gmail.com"
                onChange={(event) =>
                  setValues({ ...values, email: event.target.value })
                }
              />
              <div className="error-message">
                {errors.email && "Email is required."}
              </div>
            </div>
            <div className={`field ${errors.password ? "error" : ""}`}>
              <label>Password</label>
              <input
                type="password"
                name="pass"
                placeholder="Password should be at least 6 characters"
                onChange={(event) =>
                  setValues({ ...values, password: event.target.value })
                }
              />
              <div className="error-message">
                {errors.password && "Password is required."}
              </div>
            </div>
            <div className={`field ${errors.confirmpass ? "error" : ""}`}>
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmpass"
                placeholder="Confirm Password"
                onChange={(event) =>
                  setValues({ ...values, confirmpass: event.target.value })
                }
              />
              <div className="error-message">
                {errors.confirmpass && "Confirm Password is required."}
              </div>
            </div>
            <button className="ui primary labeled icon button" onClick={signup}>
              <i className="unlock alternate icon"></i>
              SignUp
            </button>
            <div className="error-message">{error}</div> {/* Display general error message */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
