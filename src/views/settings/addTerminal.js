import { useState, useEffect } from "react";

const AddTerminal = () => {
  const [terminalData, setTerminalData] = useState({});

  useEffect(() => {
    // Example: Fetching data or initializing the component
    console.log("AddTerminal component mounted");
    return () => {
      console.log("AddTerminal component unmounted");
    };
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTerminalData({ ...terminalData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Submit the terminalData to API or process it
    console.log("Submitted terminal data:", terminalData);
  };

  return (
    <>
      <h2>Add Terminal</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="terminalName">Terminal Name:</label>
          <input
            type="text"
            id="terminalName"
            name="terminalName"
            value={terminalData.terminalName || ""}
            onChange={handleInputChange}
          />
        </div>
        {/* Add other form fields as needed */}
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default AddTerminal;
