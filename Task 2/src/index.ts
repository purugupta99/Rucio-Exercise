import {
  JupyterFrontEnd, JupyterFrontEndPlugin
} from '@jupyterlab/application';

import {
  ICommandPalette, MainAreaWidget
} from '@jupyterlab/apputils';

import {
  Widget
} from '@lumino/widgets';

/**
 * Initialization data for the weather extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'weather',
  autoStart: true,
  requires: [ICommandPalette],
  
  activate: (app: JupyterFrontEnd, palette: ICommandPalette) => {
	  console.log('JupyterLab extension Weather API is activated!');
	  console.log('ICommandPalette:', palette);

	  let theUrl = 'http://www.mocky.io/v2/5e5f63aa3100005000afdb51'

	  // Create a blank content widget inside of a MainAreaWidget
	  const content = new Widget();
	  const widget = new MainAreaWidget({content});
	  widget.id = 'weather-jupyterlab';
	  widget.title.label = 'Weather API';

	  // widget.title.iconClass = 'fas fa-cloud-sun-rain';
	  widget.title.closable = true;

	  var place = document.createElement("input");   // Create a <input> element
	  place.setAttribute("id", "place");
	  content.node.appendChild(place);

	  var get_weather = document.createElement("button");   // Create a <button> element
	  get_weather.setAttribute("id", "get_weather");
	  get_weather.innerHTML = 'Submit'

	  var output = document.createElement("p");
	  output.setAttribute("id", "output")
	  output.innerHTML = "";
	  content.node.appendChild(output);

	  get_weather.onclick = function () {
	  		let cur_place = (<HTMLInputElement>document.getElementById("place")).value;
	  		var response = httpGet(theUrl);

	  		var output_elem = <HTMLElement> document.getElementById("output");
	  		output_elem.innerHTML = response["weather"]; 
		    console.log(cur_place);
		};

	  content.node.appendChild(get_weather);

	  	function httpGet(theUrl : string)
		{	
		    var xmlHttp = new XMLHttpRequest();
		    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
		    xmlHttp.send( null );
		    // console.log(xmlHttp.responseText)
		    return JSON.parse(xmlHttp.responseText);
		}
	  
	  // app.shell.add(widget, 'left', { rank: 1000 });
	  // Add an application command

	  const command: string = 'weather:open';
	  app.commands.addCommand(command, {
	    label: 'Weather API',
	    execute: () => {
	      if (!widget.isAttached) {
	        // Attach the widget to the main work area if it's not there
	        app.shell.add(widget, 'main');
	      }
	      // Activate the widget
	      app.shell.activateById(widget.id);
	    }
	  });

	  // Add the command to the palette.
	  palette.addItem({command, category: 'Tutorial'});
	}
};

export default extension;
