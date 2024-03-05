import { Heading, Pane, Text, SearchInput } from "evergreen-ui";
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
                height={480}>
                <SearchInput placeholder="Enter Username" onChange={(e) => setUsername(e.target.userName)} userName={userName}/>
                <SearchInput placeholder="Enter Password" onChange={(e) => setPassword(e.target.password)} password={password}/>
                </Pane> 
        </Pane>

        
    );
}

export default Login;