import {
  Heading,
  Pane,
  Button,
  Text,
  TextInputField,
  toaster
} from "evergreen-ui";
import { useState } from "react";
import { Link as RouteLink } from "react-router-dom";
import Navbar from "../components/Navbar.js";

function SignUp(props) {
  const [creds, setCreds] = useState({
    username: "",
    password: "",
  });
  const [checkPassword, setCheckPassword] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    switch (name) {
      case "username":
        setCreds({ ...creds, username: value });
        break;
      case "password":
        setCreds({ ...creds, password: value });
        break;
      default:
        break;
    }
  }

  async function submitForm(e) {
    // Sends the data to myapp.js with the username and password data along with the extra password for checking
    e.preventDefault();
    if (creds.password === checkPassword) {
      // If the password is == to reenter password, send the credentials through to backend
      props.handleSubmit(creds);
      setCreds({ username: "", password: "" });
      setCheckPassword("");
    }
    else {
      // If it isnt, dont send data and ask for user to make passwords the same
      toaster.danger("Password mismatch");
    }
  }
  // Return is for all props used in creating the website and text data entries for password, username and recheck password, along with button to signup
  return (
    <Pane>
      <Navbar username={props.username} />
      <Pane
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Heading margin={8} fontSize={32} marginY={60}>
          SignUp
        </Heading>
        <Pane
          elevation={4}
          float="left"
          is="section"
          background="darkgreen"
          border="muted"
          marginY={24}
          paddingTop={12}
          paddingX={40}
          width={360}
          height={420}
          borderRadius={10}
        >
          <form onSubmit={submitForm}>
            <Pane paddingY={30}>
              <TextInputField
                label={<span style={{ color: "white" }}>Username</span>}
                name="username"
                id="username"
                placeholder="Enter Username"
                onChange={handleChange}
                value={creds.username}
              />
              <Pane paddingY={10} />
              <TextInputField
                label={<span style={{ color: "white" }}>Password</span>}
                name="password"
                id="password"
                placeholder="Enter Password"
                onChange={handleChange}
                value={creds.password}
                type="password"
              />
              <Pane paddingY={10} />
              <TextInputField
                label={
                  <span style={{ color: "white" }}>Re-enter Password</span>
                }
                name="checkPassword"
                id="checkPassword"
                placeholder="Re-enter Password"
                value={checkPassword}
                onChange={(e) => setCheckPassword(e.target.value)}
                type="password"
              />
              <Pane
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                paddingY={10}
              >
                <Button type="submit" style={{ marginTop: "-3px" }}>
                  Sign Up
                </Button>
                <RouteLink
                  to="/login"
                  style={{ textDecoration: "none", marginTop: "10px" }}
                >
                  <Text paddingY={10} color="white">
                    Already have an account?
                  </Text>
                </RouteLink>
              </Pane>
            </Pane>
          </form>
        </Pane>
      </Pane>
    </Pane>
  );
}

export default SignUp;
