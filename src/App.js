import React from 'react';
import './App.css';
import ClockComponent from './ClockComponent';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiResponse: "", // This will hold the API response
    };
  }

  callApiStartTimer() {
    fetch('http://localhost:5000/start', {
      method: 'POST',
    })
    .then(response => response.json())
    .then(data => alert(data.message))
    .catch(error => alert(error));
  }

  callApiStopTimer() {
    fetch('http://localhost:5000/stop', {
      method: 'POST',
    })
    .then(response => response.json())
    .then(data => alert(data.message))
    .catch(error => alert(error));
  }

  callApiResults() {
    fetch('http://localhost:5000/results', {
      method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
      // Update the state with the API response
      this.setState({ apiResponse: JSON.stringify(data) });
    })
    .catch(error => alert(error));
  }

  render() {
    // Assuming this.state.apiResponse is already an array of objects
  // Check if apiResponse is not empty
  let resultsArray = [];

  if (this.state.apiResponse) {
    try {
      resultsArray = JSON.parse(this.state.apiResponse);
    } catch (error) {
      alert("Error parsing JSON:", error);
    }
  }  
    return (
      <div className="App">
        <header className="App-header">
          <p>
            <ClockComponent />
          </p>
          <p>
            <button className="buttonStyle" onClick={() => this.callApiStartTimer()}>Start timer</button>
            <span> </span>
            <button className="buttonStyle" onClick={() => this.callApiStopTimer()}>Stop timer</button>
          </p>
          <p>
            <button className="buttonStyle" onClick={() => this.callApiResults()}>Show Results</button>
          </p>
          <div>Results:</div>
          {resultsArray.map((result, index) => (
            <div key={index}>
              <p>Elapsed Time: {result.elapsed_time.toFixed(2)} seconds</p>
              <p>Start Time: {new Date(result.start_time * 1000).toLocaleString()}</p>
              <p>Stop Time: {new Date(result.stop_time * 1000).toLocaleString()}</p>
              <hr />
            </div>
          ))}
        </header>
      </div>
    );
  } 
}

export default App;