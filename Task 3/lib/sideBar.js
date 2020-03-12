import { ReactWidget } from '@jupyterlab/apputils';
import { Signal } from '@lumino/signaling';
import React from 'react';
// Weather Displaying Component
class DispComponent extends React.Component {
    render() {
        return (React.createElement("div", null,
            React.createElement("h4", null,
                "City: ",
                this.props.city),
            React.createElement("h4", null,
                "Description:  ",
                this.props.description),
            React.createElement("h4", null,
                "Temperature: ",
                this.props.temperature,
                " \u2103"),
            React.createElement("h4", null,
                "Humidity: ",
                this.props.humidity,
                " %")));
    }
}
//  Weather widget class (attaches to the Left SideBar) 
export class sideBar extends ReactWidget {
    constructor() {
        super();
        this._respData = new Signal(this);
        this.id = "sidepanel:id";
        this.city_data = {};
        this.weather_data = {};
        this.title.iconClass = 'fas fa-cloud-sun-rain';
        this.handleInput = this.handleInput.bind(this);
    }
    // Gets city name with each change
    handleInput(event) {
        this.city_data.name = event.target.value;
        this.update();
    }
    // Send response data to the kernel for local variable access
    get handleDataSend() {
        return this._respData;
    }
    // Sends request to the WeatherStack API to get the data asynchronously
    async handleRequest() {
        console.log(this.city_data.name);
        const resp = await fetch("http://api.weatherstack.com/current?access_key=e817b729688f9a8aee4a018bb9578c81&query=" + this.city_data.name);
        if (resp.ok) {
            var data = await resp.json();
            console.log(data);
            this.weather_data.city = data.location.name;
            this.weather_data.description = data.current.weather_descriptions[0];
            this.weather_data.feelslike = data.current.feelslike;
            this.weather_data.humidity = data.current.humidity;
            this.weather_data.temperature = data.current.temperature;
            this.update();
            this._respData.emit(this.weather_data);
        }
    }
    render() {
        return (React.createElement("div", { className: "App" },
            React.createElement("div", null,
                React.createElement("header", { className: "App-header" },
                    React.createElement("h1", { className: "App-title" }, "Weather Dashboard")),
                React.createElement("br", null),
                React.createElement("br", null),
                React.createElement("div", { className: "formContainer" },
                    React.createElement("div", { className: "form-group form-inline" },
                        React.createElement("input", { type: "text", onChange: (event) => {
                                this.handleInput(event);
                            } }),
                        React.createElement("button", { onClick: () => {
                                this.handleRequest();
                            } }, "Get Weather"))),
                this.weather_data ? React.createElement(DispComponent, Object.assign({}, this.weather_data)) : "")));
    }
}
export default sideBar;
