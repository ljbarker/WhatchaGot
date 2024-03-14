import React, { useState, useEffect } from "react";
import { Pane, Button, Heading, Table, TextInput } from "evergreen-ui";
import Navbar from "../components/Navbar.js";

function MyShoppingList(props) {
  const [shoppinglist, setList] = useState([]);
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    fetchShoppingList()
      .then((res) => res.json())
      .then((json) => setList(json["shopping_list"]))
      .catch((error) => console.log(error));
  }, []);

  function addAuthHeader(otherHeaders = {}) {
    if (props.token === "INVALID_TOKEN") {
      return otherHeaders;
    } else {
      return {
        ...otherHeaders,
        Authorization: `Bearer ${props.token}`,
      };
    }
  }

  function fetchShoppingList() {
    const promise = fetch(
      "https://whatchagot.azurewebsites.net/shopping_list",
      {
        headers: addAuthHeader(),
      }
    );
    return promise;
  }

  function postItem(item) {
    // EXTREMELY slow, go to office hours to see if correct
    const promise = fetch(
      "https://whatchagot.azurewebsites.net/shopping_list",
      {
        method: "POST",
        headers: addAuthHeader({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(item),
      }
    );

    return promise;
  }

  function deleteItem(id) {
    const promise = fetch(
      `https://whatchagot.azurewebsites.net/shopping_list/${id}`,
      {
        method: "DELETE",
        headers: addAuthHeader(),
      }
    );
    return promise;
  }

  function handleDelete(id) {
    const updated = shoppinglist.filter((item) => {
      return item._id !== id;
    });
    deleteItem(id)
      .then((res) => {
        if (res.status === 204) {
          setList(updated);
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
    const id = (Math.random() * 1000).toString();
    const data = { _id: id, item, quantity };
    postItem(data)
      .then((res) => {
        if (res.status === 201) {
          return res.json();
        } else {
          console.log("Error: " + res.status);
          return undefined;
        }
      })
      .then((json) => {
        if (json) setList([...shoppinglist, json]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <Pane>
      <Pane>
        <Navbar />
        <Pane
          display="flex"
          alignItems="center"
          justifyContent="center"
          paddingY={30}
        >
          <Heading fontSize={32}>Shopping List</Heading>
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
          <Button style={{ marginTop: "-3px" }}>Add</Button>
        </form>
      </Pane>
      <Table>
        <Table.Head>
          <Table.TextHeaderCell>Item</Table.TextHeaderCell>
          <Table.TextHeaderCell marginRight={140}>
            Quantity
          </Table.TextHeaderCell>
        </Table.Head>
        <Table.Body height={240}>
          {shoppinglist.map((item, index) =>
          (
            <Table.Row key={index}>
              <Table.TextCell>{item.item}</Table.TextCell>
              <Table.TextCell>{item.quantity}</Table.TextCell>
              <Button
                marginY={15}
                marginRight={10}
                onClick={() => handleDelete(item._id)}
              >
                delete
              </Button>
            </Table.Row>
          )
          )}
        </Table.Body>
      </Table>
    </Pane>
  );
}

export default MyShoppingList;
