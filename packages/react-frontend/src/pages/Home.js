import { Heading, Pane, Paragraph, SearchInput } from "evergreen-ui";
import { useState } from 'react';
import Navbar from "../components/Navbar";
function Home() {
    const [value, setValue] = useState("");
    const [headerValue, setheaderValue] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setheaderValue(value);
    };

    return (
        <Pane>
            <Navbar/>
            <Pane>
                <Heading fontSize={32}>Home</Heading>
                <Paragraph>Welcome to the WhatchaGot page!</Paragraph>
            </Pane>
            <Pane display="flex" alignItems="center" justifyContent="center">
                    <form onSubmit={handleSubmit}>
                        <SearchInput placeholder="Enter recipe here..." onChange={(e) => setValue(e.target.value)} value={value}/>
                    </form>
                </Pane>
            <Pane>
                <Heading>You inputted: {headerValue}</Heading>
            </Pane>
        </Pane>
    );
}

export default Home;