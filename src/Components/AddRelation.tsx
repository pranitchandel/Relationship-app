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
  const handleFirstChange = (event: any) => {
    setFirstPerson(event.target.value as string);
  };
  const handleSecondChange = (event: any) => {
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
      <option value={person} key={key}>
        {person}
      </option>
    );
  });

  return (
    <div>
      <h2>Add relation</h2>
      <div className="relationWrapper">
        <div className="selectWrapper">
          <label htmlFor="firstName">First Person</label>
          <select
            className="personSelect"
            name="firstName"
            id="personNames"
            onChange={handleFirstChange}
          >
            <option disabled selected value="">
              Select an option
            </option>
            {Menulist}
          </select>
        </div>
        <div className="addRelationSpan">is friend of </div>
        <div className="selectWrapper">
          <label htmlFor="secondName">Second Person</label>
          <select
            className="personSelect"
            name="secondName"
            id="personNames"
            onChange={handleSecondChange}
          >
            <option disabled selected value="">
              Select an option
            </option>
            {Menulist}
          </select>
        </div>
        <div className="addRelationWrapper">
          <button onClick={handleClickAdd} className="relationAdd">
            Add Relation
          </button>
        </div>
      </div>

      <div className="error">{error}</div>

      <h2>Relations</h2>
      <div className="relationships">
        {relationships.map((relations, key) => (
          <div key={key} className="listContainer">
            <div className="spanContainer">
              <span className="relationListSpan">{relations.firstPerson}</span>
              <span className="listText">is friend of</span>
              <span className="relationListSpan">{relations.secondPerson}</span>
            </div>
            <button
              className="removeRelationBtn"
              onClick={() => handleRemoveRelation(key)}
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddRelation;
