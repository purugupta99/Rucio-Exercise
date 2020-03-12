import { INotebookTracker } from '@jupyterlab/notebook';
import { sideBar } from './sideBar';
function createKernelComm(panel) {
    // Open a comm in the panel to send weather data
    const comm = panel.sessionContext.session.kernel.createComm("my_comm_target");
    comm.onMsg = (msg) => {
        console.log("Message received");
    };
    comm.open({ 'msgtype': 'from-frontend' });
    return Promise.resolve(comm);
}
const extension = {
    id: 'weatherAPI',
    autoStart: true,
    requires: [INotebookTracker],
    activate: (app, notebooks) => {
        console.log('JupyterLab extension weather is activated!');
        // Create a Side Panel and add it to the left area
        const sidePanel = new sideBar();
        app.shell.add(sidePanel, 'left');
        notebooks.widgetAdded.connect((sender, panel) => {
            console.log("Kernel Widget added.");
            panel.sessionContext.ready.then(() => {
                console.log("Session context ready.");
                // Load Kernel Extension by executing %load_ext on notebook
                panel.sessionContext.session.kernel.requestExecute({
                    code: '%load_ext kernalize'
                });
                // open a comm with the current kernel
                return createKernelComm(panel);
            }).then((comm) => {
                // connect to the sidepanel ongetData signal
                sidePanel.handleDataSend.connect((sender, data) => {
                    // send the data to the kernel
                    comm.send({ 'weather_data': data });
                });
            });
        });
    }
};
export default extension;
