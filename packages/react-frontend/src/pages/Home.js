import { Heading, Pane, Link, SearchInput, Table } from "evergreen-ui";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar.js";

function Home(props) {
  const [value, setValue] = useState("");
  const [headerValue, setheaderValue] = useState("");
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("https://whatchagot.azurewebsites.net/recipe_API", {
      headers: props.addAuthHeader(),
    })
      .then((res) => res.json())
      .then((json) => setRecipes(json))
      .catch((error) => console.log(error));
  }, [props]);


  const handleSubmit = (e) => {
    e.preventDefault();
    setheaderValue(value);
  };
  return (
    <Pane>
      <Navbar username={props.username} />
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
          <Table.TextHeaderCell>Link to Recipe</Table.TextHeaderCell>
        </Table.Head>
        <Table.Body>
          {recipes.map((recipe, index) => {
            let ingredients = [];
            for (let i = 1; i <= 15; i++) {
              ingredients.push(recipe[`strIngredient${i}`]);
            };
            return (

              < Table.Row key={index} height="auto" >
                <Table.TextCell>{recipe.strMeal}</Table.TextCell>
                <Table.TextCell><Link href={recipe.strSource}>To Recipe</Link></Table.TextCell>
              </Table.Row>
            )
          })}
          
        </Table.Body>
      </Table>
    </Pane >
  );
}

export default Home;
