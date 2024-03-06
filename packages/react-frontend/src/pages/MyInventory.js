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
import InventoryForm from "../components/InventoryForm";
import Navbar from "../components/Navbar";

function MyInventory() {
  const [inventory, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setShowForm(false);
    fetchInventory()
      .then((res) => res.json())
      .then((json) => setItems(json["inventory_list"]))
      .catch((error) => console.log(error));
  }, []);

  function fetchInventory() {

    const promise = fetch("https://whatchagot.azurewebsites.net/inventory_list");

    return promise;
  }

  function postItem(item) {

    const promise = fetch("https://whatchagot.azurewebsites.net/inventory_list", {

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
    inventory.forEach((item, i) => {
      if (i === index) {
        id = item._id;
      }
    });
    const updated = inventory.filter((item, i) => {
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

    const promise = fetch(`https://whatchagot.azurewebsites.net/inventory_list/${id}`, {

      method: "DELETE",
    });
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
        if (json) setItems([...inventory, json]);
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
          {inventory.map((item, index) => (
            <Table.Row
              key={index}
              isSelectable
              onSelect={() => alert(item.name)}
            >
              <Table.TextCell>{item.item}</Table.TextCell>
              <Table.TextCell>{item.quantity}</Table.TextCell>
              <Table.TextCell>{item.expiration}</Table.TextCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Pane>
  );
}

export default MyInventory;
