import React from "react";
import { Button, Header, Menu, Search } from "semantic-ui-react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Home.css";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [user] = useAuthState(auth);

  const logoutUser = () => {
    auth.signOut().then(() => {
      console.log("logged out!");
    });
  };

  return (
    <div>
      <Header block>
        <div className="header">
          <Header className="heading">
            <h1>DEV@DEAKIN</h1>
          </Header>
          <Search className="search" size="huge" />
          <div className="header-right">
            {auth.currentUser ? (
              <div>
                <Menu>
                  <Menu.Item>
                    <Button className="ui inverted primary button" secondary as="a" href="/" onClick={logoutUser}>
                      Log Out
                    </Button>
                  </Menu.Item>
                  <Menu.Item>
                    <div>{user ? user.email : `Please Login or Sign Up`}</div>
                  </Menu.Item>
                </Menu>
              </div>
            ) : (
              <div>
                <Menu>
                  <Menu.Item>
                    <Link to={"/sign-in"}>
                      <Button className="ui inverted primary button" primary as="a">
                        Sign In
                      </Button>
                    </Link>
                  </Menu.Item>
                  <Menu.Item>
                    <Link to={"/sign-up"}>
                      <Button className="ui inverted primary button" secondary as="a" href="/sign-up">
                        Sign Up
                      </Button>
                    </Link>
                  </Menu.Item>
                </Menu>
              </div>
            )}
          </div>
        </div>
      </Header>
    </div>
  );
};

export default HomePage;
