import { Heading, Pane, Paragraph, SearchInput, Table } from "evergreen-ui";
import { useState } from 'react';
import Navbar from "../components/Navbar";
function Home() {
    const [value, setValue] = useState("");
    const [headerValue, setheaderValue] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setheaderValue(value);
    };
    return (
        <Pane>
            <Navbar/>
            <Pane display="flex" alignItems="center" justifyContent="center" paddingY={10}>
                <Heading fontSize={32}>Welcome to WhatchaGot!</Heading>
            </Pane>
            <Pane display="flex" alignItems="center" justifyContent="center" paddingY={10}>
                    <form onSubmit={handleSubmit}>
                        <SearchInput placeholder="Enter recipe here..." onChange={(e) => setValue(e.target.value)} value={value}/>
                    </form>
            </Pane>
            <Table>
                <Table.Head>
                <Table.TextHeaderCell>Recipe</Table.TextHeaderCell>
                <Table.TextHeaderCell>Ingredients</Table.TextHeaderCell>
                </Table.Head>
                <Table.Body height={240}>
            
                <Table.Row key={headerValue} isSelectable onSelect={() => alert(headerValue)}>
                <Table.TextCell>{headerValue}</Table.TextCell>
                <Table.TextCell>{headerValue}</Table.TextCell>
                </Table.Row>
                </Table.Body>
                </Table>
                </Pane>
    );
}

export default Home;