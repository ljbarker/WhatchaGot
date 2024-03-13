import React, { useState, useEffect } from "react";
import {
  Card,
  Pane,
  Group,
  Button,
  TrashIcon,
  ManualIcon,
  Dialog,
  Heading,
  Table,
  TextInput,
} from "evergreen-ui";
import { Link } from "react-router-dom";
import ShoppingListForm from "../components/ShoppingListForm.js";
import Navbar from "../components/Navbar.js";

function MyShoppingList() {
  const [shoppinglist, setList] = useState([]);
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState("");
  const [edit, setEdit] = useState(-1);

  useEffect(() => {
    fetchShoppingList()
      .then((res) => res.json())
      .then((json) => setList(json["shopping_list"]))
      .catch((error) => console.log(error));
  }, []);

  function fetchShoppingList() {
    const promise = fetch("https://whatchagot.azurewebsites.net/shopping_list");
    return promise;
  }

  function postItem(item) {
    // need to set up the item in return (id, item, quantity)
    const promise = fetch(
      "https://whatchagot.azurewebsites.net/shopping_list",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      }
    );

    return promise;
  }

  function putItem(id, item) {
    // need to set up the item in return (id, item, quantity)
    const promise = fetch(
      `https://whatchagot.azurewebsites.net/shopping_list/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
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
      }
    );
    return promise;
  }

  function removeOneItem(index) {
    let id;
    shoppinglist.forEach((item, i) => {
      if (i === index) {
        id = item._id;
      }
    });
    const updated = shoppinglist.filter((item, i) => {
      return i !== index;
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

  function handleEdit(id) {
    setEdit(id);
  }

  function handleUpdate(item) {
    putItem(item)
      .then((res) => {
        if (res.status === 201) {
          return res.json();
        } else {
          console.log("Error: " + res.status);
          return undefined;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleItem(event) {}

  function handleSubmit(event) {
    postItem(item)
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
      <Table>
        <Table.Head>
          <Table.SearchHeaderCell />
          <Table.TextHeaderCell>Quantity</Table.TextHeaderCell>
        </Table.Head>
        <Table.Body height={240}>
          {shoppinglist.map((item, index) => (
            <Table.Row
              key={index}
              isSelectable
              onSelect={() => alert(item.name)}
            >
              <Table.TextCell>{item.name}</Table.TextCell>
              <Table.TextCell>{item.quantity}</Table.TextCell>
            </Table.Row>
          ))}
          {showAddItem && (
            <Table.Row>
              <Table.TextCell>
                <TextInput
                  name="name"
                  value={newItem.name}
                  onChange={handleItem}
                  placeholder="Item Name"
                />
              </Table.TextCell>
              <Table.TextCell>
                <TextInput
                  name="quantity"
                  value={newItem.quantity}
                  onChange={handleItem}
                  placeholder="Quantity"
                />
              </Table.TextCell>
              <Table.TextCell>
                <Button appearance="primary" onClick={handleSubmit}>
                  Add
                </Button>
              </Table.TextCell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
      <Button onClick={handleAddItem}>Add Item</Button>
    </Pane>
  );
}

export default MyShoppingList;
