import {
  JupyterFrontEnd, JupyterFrontEndPlugin
} from '@jupyterlab/application';

import {sideBar} from './sideBar';

const extension: JupyterFrontEndPlugin<void> = {
  id: 'weatherAPI',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {

    console.log('JupyterLab extension weather is activated!');
    
    // Create a Side Panel and add it to the left area
    const sidePanel = new sideBar();
    app.shell.add(sidePanel, 'left');

  }
};

export default extension;