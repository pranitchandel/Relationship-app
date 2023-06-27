import { useState } from "react";

const GetDegree = ({ personList, relationships }) => {
  const [firstPerson, setFirstPerson] = useState("");
  const [secondPerson, setSecondPerson] = useState("");
  const [error, setError] = useState("");
  const [path, setPath] = useState([]);
  const handleFirstChange = (event: any) => {
    setFirstPerson(event.target.value as string);
  };
  const handleSecondChange = (event: any) => {
    setSecondPerson(event.target.value as string);
  };

  const handleClick = () => {
    if (firstPerson === "" || secondPerson === "") {
      setError("Please select valid names");
      return;
    }
    setError("");
    personList[-1] = "No relations";
    const tempArray = [];
    setPath(tempArray);
    let v;
    let adjList;
    function Graph(vertices) {
      v = vertices;
      initAdjList();
    }

    function initAdjList() {
      adjList = new Array(v);
      for (let i = 0; i < v; i++) {
        adjList[i] = [];
      }
    }

    function addEdge(u, v) {
      adjList[u].push(v);
    }

    function printAllPaths(s, d) {
      let isVisited = new Array(v);
      for (let i = 0; i < v; i++) isVisited[i] = false;
      let pathList = [];
      pathList.push(s);
      printAllPathsUtil(s, d, isVisited, pathList);
    }

    function printAllPathsUtil(u, d, isVisited, localPathList) {
      if (u === d) {
        tempArray.push(JSON.stringify(localPathList));
        console.log(tempArray);
        setPath(tempArray);
        return;
      }

      isVisited[u] = true;

      for (let i = 0; i < adjList[u].length; i++) {
        if (!isVisited[adjList[u][i]]) {
          localPathList.push(adjList[u][i]);
          printAllPathsUtil(adjList[u][i], d, isVisited, localPathList);

          localPathList.splice(localPathList.indexOf(adjList[u][i]), 1);
        }
      }
      isVisited[u] = false;
    }

    Graph(personList.length);
    for (let relation of relationships) {
      addEdge(
        personList.indexOf(relation.firstPerson),
        personList.indexOf(relation.secondPerson)
      );
      addEdge(
        personList.indexOf(relation.secondPerson),
        personList.indexOf(relation.firstPerson)
      );
    }

    let s = personList.indexOf(firstPerson);
    let d = personList.indexOf(secondPerson);

    printAllPaths(s, d);
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
      <h2>Check degree of relationship</h2>
      {/* <Stack
        spacing={2}
        direction="row"
        sx={{
          justifyContent: "center",
          alignItems: "center",
          width: "60%",
          margin: "auto",
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
        <span className="addRelationSpan">is related to </span>
        <Box>
          <FormControl variant="standard" sx={{ m: 1, width: 150 }}>
            <InputLabel id="demo-simple-select-label">Second Person</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={secondPerson}
              label="secondPerson"
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
          onClick={handleClick}
        >
          Get Degree
        </Button>
      </Stack> */}
      {/* <div className="error">{error}</div> */}

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
        <span className="addRelationSpan">is friend of </span>
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
          <button onClick={handleClick} className="relationAdd">
            Get Relations
          </button>
        </div>
      </div>

      <div className="error">{error}</div>
      <div className="relationsWrapper">
        {path.length > 0 ? (
          path.map((pt, k) => {
            return (
              <div key={k} className="relationContainer">
                {JSON.parse(pt).map((p, key) => {
                  return (
                    <span className="individualPath" key={key}>
                      {personList[p]}{" "}
                    </span>
                  );
                })}
              </div>
            );
          })
        ) : (
          <div className="relationContainer">
            <span className="individualPath">No relations</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default GetDegree;
