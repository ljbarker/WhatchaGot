import { Heading, Pane, Paragraph } from "evergreen-ui";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {
    return (
        <Pane>
            <Navbar/>
            <Pane>
                <Heading fontSize={32}>Home</Heading>
                <Paragraph>Welcome to the WhatchaGot page!</Paragraph>
            </Pane>
        </Pane>
    );
}

export default Home;