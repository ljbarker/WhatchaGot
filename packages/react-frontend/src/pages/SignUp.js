import { Heading, Pane, TextInput, Button, Text, TextInputField } from "evergreen-ui";
import { useState } from "react";
import { Link as RouteLink } from "react-router-dom";
import Navbar from "../components/Navbar.js";

function SignUp(props) {
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
          SignUp
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
          height={420}
        >
          <form onSubmit={submitForm}>
            <Pane paddingY={30}>
              <TextInputField
                label="Username"
                name="username"
                id="username"
                placeholder="Enter Username"
                onChange={handleChange}
                value={creds.username}
              />
              <Pane paddingY={10} />
              <TextInputField
                label="Password"
                name="password"
                id="password"
                placeholder="Enter Password"
                onChange={handleChange}
                value={creds.password}
              />
              <Pane paddingY={10} />
              <TextInputField
                label="Re-enter Password"
                name="repassword"
                id="repassword"
                placeholder="Re-enter Password"
              /* Add functionality to check if curr password is equal to re-entered password */
              />
              <Pane display="flex" flexDirection="column" alignItems="center" justifyContent="center" paddingY={10}>
                <Button type="submit">Sign Up</Button>
                <RouteLink to="/login"><Text paddingY={10}>Already have an account?</Text></RouteLink>
              </Pane>
            </Pane>
          </form>
        </Pane>
      </Pane>
    </Pane>
  );
}

export default SignUp;
