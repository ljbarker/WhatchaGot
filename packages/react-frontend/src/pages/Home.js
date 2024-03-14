import { Heading, Pane, Link, Paragraph, SearchInput, Table } from "evergreen-ui";
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
      .then((json) => setRecipes(json))
      .catch((error) => console.log(error));
  }, []);

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
          {/* {recipes.map((recipe, index) => (
          <Card
            key={index}
            elevation={1}
            margin={16}
            padding={16}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            alignItems="center"
          >
            <Heading size={900} padding={10}>
              {recipe.name}
            </Heading>
            <Group>
              <Button iconAfter={ManualIcon}>
                <Link to={`/recipe/${recipe._id}`}>View</Link>
              </Button>
              <Button
                intent="danger"
                iconAfter={TrashIcon}
                onClick={() => removeOneRecipe(index)}
              >
                Delete
              </Button>
            </Group>
          </Card>
        ))} */}
        </Table.Body>
      </Table>
    </Pane >
  );
}

export default Home;
