import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Pane, Table, Text } from 'evergreen-ui';
import { useEffect, useState } from 'react';

function Recipe() {
    const { id } = useParams();

    const [recipe, setRecipe] = useState({name: "", ingredientList: [], description: ""});
    
    useEffect(() => {
        fetch(`http://whatchagot.azurewebsites.net/recipe/${id}`)
        .then((res) => res.json())
        .then((json) => setRecipe(json))
        .catch((error) => console.log(error));
    }, [id]);

    console.log(recipe)

    return (
        <Pane>
            <Navbar/>
            <Pane>
                <Table>
                    <Table.Head>
                        <Table.TextHeaderCell>Name</Table.TextHeaderCell>
                        <Table.TextHeaderCell>Ingredients</Table.TextHeaderCell>
                        <Table.TextHeaderCell>Description</Table.TextHeaderCell>
                    </Table.Head>
                    <Table.Body>
                        <Table.Row height="auto">
                            <Table.TextCell><Text>{recipe.name}</Text></Table.TextCell>
                            <Table.TextCell>
                                <Pane display="flex" flexDirection="column">
                                {recipe.ingredientList.map((element, i) => (
                                    <Text key={i}>{element.name + " " + element.amount}</Text>
                                ))}
                                </Pane>
                            </Table.TextCell>
                            <Table.TextCell><Text>{recipe.description}</Text></Table.TextCell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </Pane>
        </Pane>
    );
}

export default Recipe;
