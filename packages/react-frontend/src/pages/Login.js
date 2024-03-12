import { Heading, Pane, Link, TextInput, Button } from "evergreen-ui";
import { useState } from "react";
import { Link as RouteLink } from "react-router-dom";
import Navbar from "../components/Navbar.js";

function Login() {
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

  return (
    <Pane>
      <Navbar />
      <Pane display="flex" flexDirection="column" alignItems="center" justifyContent="center">
        <Heading margin={8} fontSize={32} marginY={60}>
          Login
        </Heading>
        <Pane
          elevation={4}
          float="left"
          is="section"
          background="lightgreen"
          border="muted"
          marginY={24}
          paddingTop={12}
          paddingX={40}
          width={360}
          height={250}
        >
          <Pane paddingY={30}>
            <TextInput
              placeholder="Enter Username"
              onChange={handleChange}
              userName={creds.username}
            />
            <Pane paddingY={10} />
            <TextInput
              placeholder="Enter Password"
              onChange={handleChange}
              password={creds.password}
            />
            <Pane display="flex" flexDirection="column" alignItems="center" justifyContent="center" paddingY={10}>
              <Button>Login</Button>
              <RouteLink to="/forgotPassword"><Link paddingY={10}>Forgot Password?</Link></RouteLink>
              <RouteLink to="/signup"><Link paddingY={10}>New User? Sign up here!</Link></RouteLink>
            </Pane>
          </Pane>
        </Pane>
      </Pane>
    </Pane>
  );
}

export default Login;
