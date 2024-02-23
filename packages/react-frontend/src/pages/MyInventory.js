import { Heading, Pane, Text } from "evergreen-ui";
import Navbar from "../components/Navbar";


function MyInventory() {
    return (
        <Pane>
            <Navbar />
            <Heading margin={8} fontSize={32}>My Inventory</Heading>
        </Pane>
    );
}

export default MyInventory;