/// <reference types="react" />
import { ReactWidget } from '@jupyterlab/apputils';
import { ISignal, Signal } from '@lumino/signaling';
interface CityInfo {
    name: string;
}
interface WeatherInfo {
    city: string;
    description: string;
    temperature: number;
    humidity: number;
    feelslike: number;
}
export declare class sideBar extends ReactWidget {
    city_data: CityInfo;
    weather_data: WeatherInfo;
    _respData: Signal<sideBar, WeatherInfo>;
    constructor();
    handleInput(event: any): void;
    get handleDataSend(): ISignal<sideBar, WeatherInfo>;
    handleRequest(): Promise<void>;
    render(): JSX.Element;
}
export default sideBar;
