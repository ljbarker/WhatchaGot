import {
  Avatar,
  Group,
  Heading,
  Tab,
  Tablist,
} from "evergreen-ui";
import { Link } from "react-router-dom";
import React from "react";

function Navbar(props) {
  return (
    <Tablist
      display="flex"
      justifyContent="space-between"
      backgroundColor="darkgreen"
      padding={8}
    >
      <Link to="/" style={{ textDecoration: "none" }}>
        <Heading size={900} marginRight={16} marginY={3} color="white">
          WhatchaGot
        </Heading>
      </Link>
      <Group display="flex" alignItems="center">
        <Link to="/myrecipes">
          <Tab size={500} color="white">
            My Recipes
          </Tab>
        </Link>
        <Link to="/myinventory">
          <Tab size={500} color="white">
            My Inventory
          </Tab>
        </Link>
        <Link to="/myshoppinglist">
          <Tab size={500} color="white">
            My List
          </Tab>
        </Link>
        <Link style={{ marginTop: "10px" }} to="/login">
          <Tab appearance="primary">
            <Avatar name={props.username} size={40} backgroundColor="white"></Avatar>
          </Tab>
        </Link>
      </Group>
    </Tablist>
  );
}

export default Navbar;
