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
      <Stack
        spacing={2}
        direction="row"
        sx={{
          justifyContent: "space-around",
          alignItems: "center",
          width: "60%",
          margin: "10px auto",
        }}
      >
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              value={person}
              required
              id="outlined-required"
              label="Required"
              onChange={handlePersonChange}
            />
          </div>
        </Box>
        <Box>
          <Button
            sx={{
              width: "25ch",
              height: "100%",
            }}
            variant="contained"
            onClick={handleAddPerson}
          >
            Add
          </Button>
        </Box>
      </Stack>
      <div className="error">{error}</div>
    </div>
  );
};

export default AddPerson;
