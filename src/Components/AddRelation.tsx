import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Stack from "@mui/material/Stack";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const AddRelation = ({ personList, setRelationship }) => {
  const [firstPerson, setFirstPerson] = useState("");
  const [secondPerson, setSecondPerson] = useState("");
  const [relationships, setRelationships] = useState<any[]>([]);
  const [error, setError] = useState("");
  const handleFirstChange = (event: SelectChangeEvent) => {
    setFirstPerson(event.target.value as string);
  };
  const handleSecondChange = (event: SelectChangeEvent) => {
    setSecondPerson(event.target.value as string);
  };
  const handleClickAdd = () => {
    if (firstPerson === "" || secondPerson === "") {
      setError("Please select valid names");
      return;
    }
    setError("");
    const newRelation = { firstPerson, secondPerson };
    setRelationship([newRelation, ...relationships]);
    setRelationships([newRelation, ...relationships]);
  };

  const handleRemoveRelation = (id) => {
    relationships.splice(id, 1);
    setRelationship([...relationships]);
    setRelationships([...relationships]);
  };
  const Menulist = personList.map((person, key) => {
    return (
      <MenuItem key={key} value={person}>
        {person}
      </MenuItem>
    );
  });

  return (
    <div>
      <h2>Add relation</h2>
      <Stack
        spacing={2}
        direction="row"
        sx={{
          justifyContent: "center",
          alignItems: "center",
          width: "60%",
          margin: "10px auto",
        }}
      >
        <Box sx={{ minWidth: 120 }}>
          <FormControl variant="standard" sx={{ m: 1, width: 150 }}>
            <InputLabel id="demo-simple-select-label">First Person</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={firstPerson}
              label="fistPerson"
              onChange={handleFirstChange}
            >
              {Menulist}
            </Select>
          </FormControl>
        </Box>
        <span className="addRelationSpan">is friend of </span>
        <Box>
          <FormControl variant="standard" sx={{ m: 1, width: 150 }}>
            <InputLabel id="demo-simple-select-label">Second Person</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={secondPerson}
              label="secondPerson"
              required
              onChange={handleSecondChange}
            >
              {Menulist}
            </Select>
          </FormControl>
        </Box>
        <Button
          sx={{
            width: "25ch",
            height: "100%",
          }}
          variant="contained"
          onClick={handleClickAdd}
        >
          Add
        </Button>
      </Stack>
      <div className="error">{error}</div>
      <h2>Relations</h2>
      <ul className="relationships">
        {relationships.map((relations, key) => (
          <div key={key} className="listContainer">
            <div className="spanContainer">
              <span className="relationListSpan">{relations.firstPerson}</span>
              is friend of
              <span className="relationListSpan">{relations.secondPerson}</span>
            </div>
            <Button
              variant="outlined"
              color="error"
              onClick={() => handleRemoveRelation(key)}
            >
              X
            </Button>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default AddRelation;
