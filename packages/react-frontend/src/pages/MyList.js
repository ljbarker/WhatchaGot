import { Heading, Pane, Text } from "evergreen-ui";
import Navbar from "../components/Navbar";


function MyList() {
    return (
        <Pane>
            <Navbar />
            <Heading margin={8} fontSize={32}>My List</Heading>
        </Pane>
    );
}

export default MyList;