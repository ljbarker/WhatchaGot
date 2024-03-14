import { Heading, Pane, Paragraph, SearchInput, Table } from "evergreen-ui";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar.js";

function Home(props) {
  const [value, setValue] = useState("");
  const [headerValue, setheaderValue] = useState("");
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("https://whatchagot.azurewebsites.net/recipe_API", {
      headers: addAuthHeader(),
    })
      .then((res) => res.json())
      .then((json) => setRecipes(json["recipe_list"]))
      .catch((error) => console.log(error));
  });

  function addAuthHeader(otherHeaders = {}) {
    if (props.token === "INVALID_TOKEN") {
      return otherHeaders;
    } else {
      return {
        ...otherHeaders,
        Authorization: `Bearer ${props.token}`
      };
    }
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    setheaderValue(value);
  };
  return (
    <Pane>
      <Navbar />
      <Pane
        display="flex"
        alignItems="center"
        justifyContent="center"
        paddingY={30}
      >
        <Heading fontSize={32}>Welcome to WhatchaGot!</Heading>
      </Pane>
      <Pane
        display="flex"
        alignItems="center"
        justifyContent="center"
        paddingY={10}
      >
        <form onSubmit={handleSubmit}>
          <SearchInput
            placeholder="Enter recipe here..."
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
        </form>
      </Pane>
      <Table>
        <Table.Head>
          <Table.TextHeaderCell>Recipe</Table.TextHeaderCell>
          <Table.TextHeaderCell>Ingredients</Table.TextHeaderCell>
        </Table.Head>
        <Table.Body>
          {recipes.map((recipe, index) => (
            <Table.Row key={index}>
              <Table.TextCell>{recipe.strMeal}</Table.TextCell>
              <Table.TextCell>
                <Pane display="flex" flexDirection="column">
                  {recipe.map((element, i) => {
                    if (i > 1 && i < 17) {
                      return (
                        <Paragraph key={i}>
                          {element}
                        </Paragraph>
                      )
                    } else {
                      return null;
                    }
                  })}
                </Pane>
              </Table.TextCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Pane>
  );
}

export default Home;
