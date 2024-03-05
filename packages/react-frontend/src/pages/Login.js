import { Heading, Pane, Link, SearchInput, Button } from "evergreen-ui";
import { useState } from 'react';
import Navbar from "../components/Navbar";


function Login() {
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <Pane>
            <Navbar />
            <Pane display="flex" alignItems="center" justifyContent="center">
                <Heading margin={8} fontSize={32}>Login</Heading>   
            </Pane>
            <Pane elevation={4}
                float="left"
                is="section"
                background="lightgreen"
                border="muted"
                marginLeft={560}
                marginY={24}
                paddingTop={12}
                paddingX={40}
                width={360}
                height={240}>
                    <Pane paddingY={30}>
                        <SearchInput placeholder="Enter Username" onChange={(e) => setUsername(e.target.userName)} userName={userName}/>
                        <Pane paddingY={10}/>
                            <SearchInput placeholder="Enter Password" onChange={(e) => setPassword(e.target.password)} password={password}/>
                            <Pane paddingX={100} paddingY={20}>
                                <Button>Login</Button>
                                <Link href="#">Forgot Password?</Link>
                            </Pane>
                        </Pane>
                </Pane> 
        </Pane>

        
    );
}

export default Login;