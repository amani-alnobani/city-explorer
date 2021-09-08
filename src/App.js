import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';



export class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      locationName: '',
      theLocationData: {},
      showMap: false,
      showAlert: false,
      errMessage: '',
      listOfWeather: []
    }
  }

  handelLocationNameChange = (e) => { this.setState({ locationName: e.target.value }) }

  handelSubmit = async (e) => {
    e.preventDefault();
    try {
      let url = `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_IQ_KEY}&q=${this.state.locationName}&format=json`;

      let serverUrl = `${process.env.REACT_APP_SERVER_URL}/weather?city_name=${this.state.locationName}`;
      let responseOperation = await axios.get(url);
      let = await axios.get(serverUrl);

      this.setState({
        theLocationData: responseOperation.data[0],
        showMap: true,
        showAlert: false,
        errMessage: '',
        listOfWeather: serverRespose.data
      });
    }
    catch (err) {
      this.setState({
        showMap: false,
        showAlert: true,
        errMessage: err.message
      })
    }
  }

  render() {
    const styling = {
      backgroundcolor: "white",
      fontfamily: "Arial",
      color: "blue",
      margin: "20px"
    }

    let newArr = this.state.listOfWeather.map(item => {
      return (<p>{item.date} : {item.description} </p>)
    })

    return (
      <div>
        {
          this.state.showAlert &&
          <Alert variant={'danger'}>
            {this.state.errMessage}
          </Alert>
        }
        <Form style={styling} onSubmit={this.handelSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control type="text" placeholder="Enter city name" onChange={this.handelLocationNameChange} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        {
          this.state.showMap &&
          <div>
            <h2 style={{ color: "darkcyan", margin: "20px 20px 20px 20px" }}>Location Info</h2>
            <p style={{ color: "darkgoldenrod", margin: "20px 20px 20px 20px" }}>{this.state.theLocationData.display_name}</p>
            <p style={{ color: "darkgoldenrod", margin: "20px 20px 20px 20px" }}>lat: {this.state.theLocationData.lat}</p>
            <p style={{ color: "darkgoldenrod", margin: "20px 20px 20px 20px" }}>lon: {this.state.theLocationData.lon}</p>
            <img style={{ margin: "20px 20px 20px 20px" }} src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_IQ_KEY}&q=${this.state.theLocationData.lat},${this.state.theLocationData.lon}&zoom=18`} alt="" />
            <p>the wether cast: {newArr}</p>
          </div>
        }
      </div>
    )
  }
}

export default App

