import { Heading, Pane, Table } from "evergreen-ui";
import Navbar from "../components/Navbar";

function MyShoppingList() {
  return (
    <Pane>
      <Pane>
        <Navbar />
        <Heading margin={8} fontSize={32}>
          My Inventory
        </Heading>
      </Pane>
      <Table>
        <Table.Head>
          <Table.SearchHeaderCell />
          <Table.TextHeaderCell>Quantity</Table.TextHeaderCell>
          <Table.TextHeaderCell>Expires</Table.TextHeaderCell>
        </Table.Head>
        <Table.Body height={240}>
          {profiles.map((profile) => (
            <Table.Row
              key={profile.id}
              isSelectable
              onSelect={() => alert(profile.name)}
            >
              <Table.TextCell>{profile.name}</Table.TextCell>
              <Table.TextCell>{profile.lastActivity}</Table.TextCell>
              <Table.TextCell isNumber>{profile.ltv}</Table.TextCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Pane>
  );
}

// need to link to database rather than hardcode **************
const profiles = [
  {
    id: "1",
    lastActivity: "a few seconds ago",
    ltv: "$365",
    name: "Cheryl Carter",
  },
  {
    id: "2",
    lastActivity: "a minute ago",
    ltv: "$427",
    name: "Heather Morales",
  },
  {
    id: "3",
    lastActivity: "3 minutes ago",
    ltv: "$538",
    name: "Sean Jackson",
  },
];

export default MyShoppingList;
