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
} from "evergreen-ui";
import { Link } from "react-router-dom";
import ShoppingListForm from "../components/ShoppingListForm";
import Navbar from "../components/Navbar";

function MyShoppingList() {
  const [shoppinglist, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setShowForm(false);
    fetchShoppingList()
      .then((res) => res.json())
      .then((json) => setItems(json["shopping_list"]))
      .catch((error) => console.log(error));
  }, []);

  function fetchShoppingList() {
    const promise = fetch("http://whatchagot.azurewebsites.net/shopping_list");
    return promise;
  }

  function postItem(item) {
    const promise = fetch("http://whatchagot.azurewebsites.net/shopping_list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });

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
          setItems(updated);
        } else {
          console.log("Error: " + res.status + " No object found.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function deleteItem(id) {
    const promise = fetch(
      `http://whatchagot.azurewebsites.net/shopping_list/${id}`,
      {
        method: "DELETE",
      }
    );
    return promise;
  }

  function updateList(item) {
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
        if (json) setItems([...shoppinglist, json]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <Pane>
      <Pane>
        <Navbar />
        <Heading margin={8} fontSize={32}>
          My Shopping List
        </Heading>
      </Pane>
      <Table>
        <Table.Head>
          <Table.SearchHeaderCell />
          <Table.TextHeaderCell>Quantity</Table.TextHeaderCell>
        </Table.Head>
        <Table.Body height={240}>
          {inventory.map((item, index) => (
            <Table.Row
              key={index}
              isSelectable
              onSelect={() => alert(item.name)}
            >
              <Table.TextCell>{item.item}</Table.TextCell>
              <Table.TextCell>{item.quantity}</Table.TextCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Pane>
  );
}

export default MyShoppingList;
