import { Heading, Pane, Link, TextInput, Button } from "evergreen-ui";
import { useState } from "react";
import Navbar from "../components/Navbar.js";

function SignUp(props) {
  const [creds, setCreds] = useState({
    username: "",
    pwd: ""
  });

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
          Sign Up
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
            <form>
            <input
              type="text"
              name="username"
              id="username"
              value={creds.username}
              onChange={handleChange}
            />
            <Pane paddingY={10} />
            <input
              type="password"
              name="password"
              id="password"
              value={creds.pwd}
              onChange={handleChange}
            />
            
            <Pane
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              paddingY={10}
            >
              <input
                type="button"
                value={props.buttonLabel || "Sign Up"}
                onClick={submitForm}
              />
            </Pane>
            </form>
          </Pane>
        </Pane>
      </Pane>
    </Pane>
  );

  function handleChange(event) {
    const { name, value } = event.target;
    switch (name) {
      case "username":
        setCreds({ ...creds, username: value });
        break;
      case "password":
        setCreds({ ...creds, pwd: value });
        break;
    }
  }

  function submitForm() {
    props.handleSubmit(creds);
    setCreds({ username: "", pwd: "" });
  }
}


export default SignUp;
