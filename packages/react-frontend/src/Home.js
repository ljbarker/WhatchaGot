import { Link } from "react-router-dom";

function Home() {
    return (
        <div>
            <h1>Home</h1>
            <p>Welcome to the WhatchaGot page!</p>
            <Link to="/myrecipes">My Recipes</Link>
        </div>
    );
}

export default Home;