import {
  Avatar,
  Dialog,
  Group,
  Heading,
  LogInIcon,
  Pane,
  Tab,
  Tablist,
} from "evergreen-ui";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <Tablist
      display="flex"
      justifyContent="space-between"
      backgroundColor="lightgreen"
      padding={8}
    >
      <Link to="/" style={{ textDecoration: "none" }}>
        <Heading size={900} marginRight={16} color="white">
          WhatchaGot
        </Heading>
      </Link>
      <Group display="flex" alignItems="center">
        <Link to="/myrecipes">
          <Tab size={500}>My Recipes</Tab>
        </Link>
        <Link to="/myinventory">
          <Tab size={500}>My Inventory</Tab>
        </Link>
        <Link to="/myshoppinglist">
          <Tab size={500}>My List</Tab>
        </Link>
        <Link to="/login">
        <Tab appearance="primary">
          <Avatar name="User" size={40}></Avatar>
        </Tab>
        </Link>
      </Group>
    </Tablist>
  );
}

export default Navbar;
