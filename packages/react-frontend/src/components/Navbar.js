import { Tab, Tablist } from "evergreen-ui";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <Tablist display="flex">
            <Link to="/"><Tab>Home</Tab></Link>
            <Link to="/myrecipes"><Tab>My Recipes</Tab></Link>
        </Tablist>
    );
}

export default Navbar;