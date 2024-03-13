import React, { useState, useEffect } from "react";
import { Pane, Button, Heading, Table, TextInput } from "evergreen-ui";
import Navbar from "../components/Navbar.js";

function MyShoppingList(props) {
  const [shoppinglist, setList] = useState([]);
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState("");
  const [uitem, usetItem] = useState("");
  const [uquantity, usetQuantity] = useState("");
  const [edit, setEdit] = useState(-1);

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

  function getItem(id) {
    const promise = fetch(
      `https://whatchagot.azurewebsites.net/shopping_list/${id}`,
      {
        method: "GET", // Use the GET method
        headers: addAuthHeader(), // Include any necessary authentication headers
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

  function putItem(id, item) {
    const promise = fetch(
      `https://whatchagot.azurewebsites.net/shopping_list/${id}`,
      {
        method: "PUT",
        headers: addAuthHeader({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(item),
      }
    );

    return promise;
  }

  function deleteItem(id) {
    console.log(id);
    const promise = fetch(
      `https://whatchagot.azurewebsites.net/shopping_list/${id}`,
      {
        method: "DELETE",
        headers: addAuthHeader(),
      }
    );
    return promise;
  }

  function handleUpdate() {
    const data = { _id: edit, name: uitem, quantity: uquantity };
    putItem(edit, data)
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          setEdit(-1);
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

  function handleDelete(id) {
    deleteItem(id)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleEdit(id) {
    // may have to change this to res.json() return like in handleSubmit below, res.item prob doesnt exist
    // if this is too complicated, maybe delete altogether (in rendering, services, backend, here)
    getItem(id)
      .then((res) => {
        console.log(res);
        usetItem(res.item);
        usetQuantity(res.quantity);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const id = (shoppinglist.length + 1).toString();
    const data = { _id: id, name: item, quantity: quantity };
    postItem(data)
      .then((res) => {
        console.log(res);
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
            item.id === edit ? (
              <Table.TextCell>
                <Table.TextCell>{item.name}</Table.TextCell>
                <TextInput
                  type="text"
                  value={uitem}
                  onChange={(e) => usetItem(e.target.value)}
                ></TextInput>
                <TextInput
                  type="text"
                  value={uquantity}
                  onChange={(e) => usetQuantity(e.target.value)}
                ></TextInput>
                <TextInput onClick={handleUpdate}>
                  <Button>Confirm</Button>
                </TextInput>
              </Table.TextCell>
            ) : (
              <Table.Row key={index}>
                <Table.TextCell>{item.name}</Table.TextCell>
                <Table.TextCell>{item.quantity}</Table.TextCell>
                <Button
                  marginY={15}
                  marginX={5}
                  marginRight={10}
                  width={70}
                  onClick={() => handleEdit(item._id)}
                >
                  edit
                </Button>
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
