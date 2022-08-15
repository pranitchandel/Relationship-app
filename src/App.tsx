import "./App.css";
import { useState } from "react";
import AddPerson from "./Components/AddPerson";
import AddRelation from "./Components/AddRelation";
import GetDegree from "./Components/GetDegree";

function App() {
  const [personList, setPersonList] = useState([]);
  const [relationships, setRelationship] = useState([]);
  return (
    <div className="App">
      <h1>find relation</h1>
      <AddPerson setPersonList={setPersonList} />
      <AddRelation personList={personList} setRelationship={setRelationship} />
      <GetDegree personList={personList} relationships={relationships} />
    </div>
  );
}

export default App;
