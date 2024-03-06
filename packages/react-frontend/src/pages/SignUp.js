import { Heading, Pane, Link, TextInput, Button } from "evergreen-ui";
import { useState } from "react";
import Navbar from "../components/Navbar.js";

function SignUp() {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Pane>
      <Navbar />
      <Pane display="flex" flexDirection="column" alignItems="center" justifyContent="center">
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
            <Pane paddingY={10} />
            <TextInput
              placeholder="Re-enter Password"
            /* Add functionality to check if curr password is equal to re-entered password */
            />
            <Pane display="flex" flexDirection="column" alignItems="center" justifyContent="center" paddingY={10}>
              <Button>Sign Up</Button>
            </Pane>
          </Pane>
        </Pane>
      </Pane>
      
    </Pane>
  );
}

export default SignUp;
