import React, { useState, useEffect } from "react";
import { Pane, Button, Heading, Table, TextInput } from "evergreen-ui";
import Navbar from "../components/Navbar.js";

function MyInventory(props) {
  const [inventory, setInventory] = useState([]);
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState("");
  const [expiration, setExpiration] = useState("");

  useEffect(() => {
    fetchinventory()
      .then((res) => res.json())
      .then((json) => setInventory(json["inventory_list"]))
      .catch((error) => console.log(error));
  }, [props]);

  function fetchinventory() {
    const promise = fetch(
      `https://whatchagot.azurewebsites.net/inventory_list/${props.username}`,
      {
        headers: props.addAuthHeader(),
      },
    );
    return promise;
  }

  function postItem(item) {
    const promise = fetch(
      "https://whatchagot.azurewebsites.net/inventory_list",
      {
        method: "POST",
        headers: props.addAuthHeader({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(item),
      },
    );

    return promise;
  }

  function deleteItem(id) {
    const promise = fetch(
      `https://whatchagot.azurewebsites.net/inventory_list/${props.username}/${id}`,
      {
        method: "DELETE",
        headers: props.addAuthHeader(),
      },
    );
    return promise;
  }

  function handleDelete(id) {
    const updated = inventory.filter((item) => {
      return item._id !== id;
    });
    deleteItem(id)
      .then((res) => {
        if (res.status === 204) {
          setInventory(updated);
        } else {
          console.log("Error: " + res.status + " No object found.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const id = Math.floor(Math.random() * 1000).toString();
    const data = {
      _id: id,
      item,
      quantity,
      expiration,
      username: props.username,
    };
    postItem(data)
      .then((res) => {
        if (res.status === 201) {
          setItem("");
          setExpiration("");
          setQuantity("");
          return res.json();
        } else {
          console.log("Error: " + res.status);
          return undefined;
        }
      })
      .then((json) => {
        if (json) setInventory([...inventory, json]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <Pane>
      <Pane>
        <Navbar username={props.username} />
        <Pane
          display="flex"
          alignItems="center"
          justifyContent="center"
          paddingY={30}
        >
          <Heading fontSize={32}>Inventory</Heading>
        </Pane>
      </Pane>
      <Pane
        display="flex"
        alignItems="center"
        justifyContent="center"
        paddingY={10}
      >
        <form onSubmit={handleSubmit}>
          <TextInput
            type="text"
            placeholder="Enter Item Name"
            onChange={(e) => setItem(e.target.value)}
          ></TextInput>
          <TextInput
            type="text"
            placeholder="Enter Quantity"
            onChange={(e) => setQuantity(e.target.value)}
          ></TextInput>
          <TextInput
            type="text"
            placeholder="Enter Expiration"
            onChange={(e) => setExpiration(e.target.value)}
          ></TextInput>
          <Button style={{ marginTop: "-3px" }}>Add</Button>
        </form>
      </Pane>
      <Table>
        <Table.Head>
          <Table.TextHeaderCell>Item</Table.TextHeaderCell>
          <Table.TextHeaderCell>Quantity</Table.TextHeaderCell>
          <Table.TextHeaderCell marginRight={65}>
            Expiration
          </Table.TextHeaderCell>
        </Table.Head>
        <Table.Body height={500}>
          {inventory.map((item, index) => (
            <Table.Row key={index}>
              <Table.TextCell>{item.item}</Table.TextCell>
              <Table.TextCell>{item.quantity}</Table.TextCell>
              <Table.TextCell>{item.expiration}</Table.TextCell>
              <Button
                marginY={15}
                marginRight={10}
                onClick={() => handleDelete(item._id)}
              >
                delete
              </Button>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Pane>
  );
}

export default MyInventory;
