require('electron').ipcRenderer.on('loaded' , function(event, data)
{
    const {ipcRenderer} = require('electron');

    $('.window-header .buttons .minimize').on('click', () =>
    {
        ipcRenderer.send('request', 'minimize');
    })

    $('.window-header .buttons .maximize').on('click', () =>
    {
        ipcRenderer.send('request', 'maximize');
    })

    $('.window-header .buttons .close').on('click', () =>
    {
        ipcRenderer.send('request', 'close');
    })

    // Nothing to do here for now...
});
