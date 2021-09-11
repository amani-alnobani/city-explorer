import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card'



export class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      locationName: '',
      theLocationData: {},
      showMap: false,
      showAlert: false,
      errMessage: '',
      listOfWeather: [],
      // listOfMovie: []
    }
  }

  handelLocationNameChange = (e) => { this.setState({ locationName: e.target.value }) }

  handelSubmit = async (e) => {
    e.preventDefault();
    try {
      let url = `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_IQ_KEY}&q=${this.state.locationName}&format=json`;
      await axios.get(url).then(location => {
        const locationStuff = location.data[0];
        this.setState({
          theLocationData: locationStuff
        })
        let serverUrl = `${process.env.REACT_APP_SERVER_URL}/weathers?lat=${locationStuff.lat}&lon=${locationStuff.lon}`;
        // console.log(serverUrl);
        axios.get(serverUrl).then(wetherData => {
          this.setState({
            listOfWeather: wetherData.data,
            showMap:true
          })
        })
        console.log(this.state.theLocationData.display_name);
        //   // const movieUrl = `${process.env.REACT_APP_SERVER_URL}/movies?query=${this.state.locationName}`;

        //   let responseOperation = await axios.get(url);
        //   let serverRespose = await axios.get(serverUrl);
        //   // let movieResponse = await axios.get(movieUrl);
        //   this.setState({
        //     theLocationData: responseOperation.data[0],
        //     showMap: true,
        //     showAlert: false,
        //     errMessage: '',
        //     listOfWeather: serverRespose.data,
        //     // listOfMovie: movieResponse.data
        //   });
        //   console.log('hello world');
      })
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
      console.log(this.state.listOfWeather);
      let wetherArr = this.state.listOfWeather.map(item => {
        return (<p>{item.date} : {item.description} </p>)
      })
      // let movieArr = this.state.listOfMovie.map(item => {
      //   return <p> titele: {item.title}
      //     overview: {item.overview}
      //     vote rate: {item.vote}</p>
      // })

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
              <img style={{ margin: "20px 20px 20px 20px" }} src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_IQ_KEY}&center=${this.state.theLocationData.lat},${this.state.theLocationData.lon}&zoom=1-18`} alt="" />
              <p>the wether cast: {wetherArr}</p>
              {/* <p>the movie: {movieArr}</p> */}
              {/* <> */}
                {/* <Card style={{ width: '18rem' }}>
                  <Card.Img variant="top" src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_IQ_KEY}&center=${this.props.nameOflocation.lat},${this.props.nameOflocation.lon}&zoom=1-18`} />
                  <Card.Body>
                    <Card.Title style={{ backgroundColor: 'red' }}>{this.props.nameOflocation.display_name}</Card.Title>
                    <Card.Text>
                      the wether cast: :{wetherArr}
                    </Card.Text>
                    <Card.Text>
                      {/* the movie: :{movieArr} */}
                    {/* </Card.Text>
                  </Card.Body>
                </Card> */} 
              {/* </> */}
            </div>
          }
        </div>
      )
    }
  }

export default App

