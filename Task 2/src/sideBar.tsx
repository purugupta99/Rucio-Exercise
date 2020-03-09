import {
    ReactWidget
} from '@jupyterlab/apputils'

import React from 'react';

// Interface for storing city data
interface CityInfo {
    name: string,
}

// Interface for storing weather info
interface WeatherInfo {
    city: string,
    description: string,
    temperature: number
    humidity: number,
    feelslike: number, 
}

class DispComponent extends React.Component <WeatherInfo> {
  render() {
    return (
      <div className="weather-box">
        <h4>City: {this.props.city}</h4>
        <h4>Description:  {this.props.description}</h4>
        <h4>Temperature: {this.props.temperature} &#8451;</h4>
        <h4>Humidity: {this.props.humidity} %</h4>
      </div>
	);
  }  
}

export class sideBar extends ReactWidget {
  
  city_data : CityInfo;
  weather_data : WeatherInfo;
  
  constructor() {
    super();

    this.id = "sidepanel:id";
	this.city_data = {} as CityInfo;
    this.weather_data = {} as WeatherInfo;
    this.title.iconClass = 'fas fa-cloud-sun-rain';
    this.handleInput = this.handleInput.bind(this);
    
}


    handleInput(event : any){

    	this.city_data.name = event.target.value;
    	this.update()
    }

    async handleRequest(): Promise<void> {

    	console.log(this.city_data.name)
    	const resp = await fetch("http://api.weatherstack.com/current?access_key=e817b729688f9a8aee4a018bb9578c81&query=" + this.city_data.name);
    	
    	if (resp.ok) {

            var data = await resp.json();
           	
           	console.log(data)

            this.weather_data.city = data.location.name;
            this.weather_data.description = data.current.weather_descriptions[0];
            this.weather_data.feelslike = data.current.feelslike;
            this.weather_data.humidity = data.current.humidity;
            this.weather_data.temperature = data.current.temperature;

            this.update();
        }
    }

    render () {

    return (
        <div className="App">
   
	        <div>
	            <header className="App-header">
	              <h1 className="App-title">Dashboard</h1>
	            </header>
	            
	            <br/><br/>
	            <div className="formContainer">
	              
	                <div className="form-group form-inline">
	                    
	                    <input type="text" onChange={(event: any) => {
	                        this.handleInput(event);
	                    }} />

	                    <button onClick={() => {
	                        this.handleRequest();
	                    }}>Get Weather</button>
	                     
	                </div>
	        	</div>

	        	{ this.weather_data ? <DispComponent {...this.weather_data} /> : "" }
	        </div>
        </div>
        );
    }
}
export default sideBar;