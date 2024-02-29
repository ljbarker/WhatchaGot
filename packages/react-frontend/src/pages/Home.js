import { Heading, Pane, Paragraph, SearchInput } from "evergreen-ui";
import { useState } from 'react';
import Navbar from "../components/Navbar";
function Home() {
    const [value, setValue] = useState("");

    return (
        <Pane>
            <Navbar/>
            <Pane>
                <Heading fontSize={32}>Home</Heading>
                <Paragraph>Welcome to the WhatchaGot page!</Paragraph>
            </Pane>
            <Pane display="flex" alignItems="center" justifyContent="center">
                <SearchInput placeholder="Enter recipe here..." onChange={(e) => setValue(e.target.value)} value={value} />
            </Pane>
        </Pane>
    );
}

export default Home;