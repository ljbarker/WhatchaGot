import { Pane } from "evergreen-ui";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {
    return (
        <Pane>
            <Navbar></Navbar>
            <div>
                <h1>Home</h1>
                <p>Welcome to the WhatchaGot page!</p>
                <Link to="/myrecipes">My Recipes</Link>
            </div>
        </Pane>
    );
}

export default Home;