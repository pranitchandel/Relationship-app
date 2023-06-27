import { ChangeEvent, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const AddPerson = ({ setPersonList }) => {
  const [person, setPerson] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    let personList: string[] = [];
    localStorage.setItem("personList", JSON.stringify(personList));
  }, []);

  const handlePersonChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPerson(e.target.value as string);
  };
  const handleAddPerson = () => {
    if (person === "") {
      setError("Please enter valid name");
      return;
    }
    setError("");
    let personList: string[] = [];
    personList = JSON.parse(localStorage.getItem("personList") || "[]");
    personList.push(person);
    localStorage.setItem("personList", JSON.stringify(personList));
    setPersonList(personList);
    setPerson("");
  };
  return (
    <div>
      <h2>Add new person</h2>
      <div className="addPersonWrapper">
        <input
          type="text"
          value={person}
          name="person"
          onChange={handlePersonChange}
          placeholder="Enter new person"
          required
          className="addPersonInput"
        />
        <button onClick={handleAddPerson} className="addButton">
          Add Person
        </button>
      </div>

      <div className="error">{error}</div>
    </div>
  );
};

export default AddPerson;
