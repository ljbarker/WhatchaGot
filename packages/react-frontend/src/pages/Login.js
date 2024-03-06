import { Heading, Pane, Link, TextInput, Button } from "evergreen-ui";
import { useState } from "react";
import Navbar from "../components/Navbar";

function Login() {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
              onChange={(e) => setUsername(e.target.userName)}
              userName={userName}
            />
            <Pane paddingY={10} />
            <TextInput
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.password)}
              password={password}
            />
            <Pane display="flex" flexDirection="column" alignItems="center" justifyContent="center" paddingY={10}>
              <Button>Login</Button>
              <Link paddingY={10} href="#">Forgot Password?</Link>
              <Link paddingY={10} href="./signup">New User? Sign up here!</Link>
            </Pane>
          </Pane>
        </Pane>
      </Pane>
    </Pane>
  );
}

export default Login;
