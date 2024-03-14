import {
  Heading,
  Pane,
  Button,
  Text,
  TextInputField,
} from "evergreen-ui";
import { useState } from "react";
import { Link as RouteLink } from "react-router-dom";
import Navbar from "../components/Navbar.js";

function Login(props) {
  const [creds, setCreds] = useState({
    username: "",
    password: "",
  });

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

  function submitForm(e) {
    e.preventDefault();
    props.handleSubmit(creds);
    setCreds({ username: "", password: "" });
  }

  return (
    <Pane>
      <Navbar />
      <Pane
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Heading margin={8} fontSize={32} marginY={60}>
          Login
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
          height={350}
          borderRadius={10}
        >
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
            <Pane paddingY={10}>
              <form
                onSubmit={submitForm}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button type="submit">Login</Button>
                <RouteLink
                  to="/forgotPassword"
                  style={{ textDecoration: "none", marginTop: "12px" }}
                >
                  <Text paddingY={10} color="white">
                    Forgot Password?
                  </Text>
                </RouteLink>
                <RouteLink
                  to="/signup"
                  style={{ textDecoration: "none", marginTop: "8px" }}
                >
                  <Text paddingY={10} color="white">
                    New User? Sign up here!
                  </Text>
                </RouteLink>
              </form>
            </Pane>
          </Pane>
        </Pane>
      </Pane>
    </Pane>
  );
}

export default Login;
