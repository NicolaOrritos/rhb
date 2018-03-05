'use strict'

/* jshint asi: true */
/* jshint node: true */
/* jshint esversion: 6 */

const path = require('path')
const json = require('../../package.json')

const electron = require('electron')

electron.app.on('ready', function()
{
    var window

    window = new electron.BrowserWindow({
        title: json.name,
        width: json.settings.width || 1024,
        height: json.settings.height || 768,

        backgroundColor: '#463a3c',
        transparent: true,

        show: false,
        frame: false
    })

    window.once('ready-to-show', () => window.show() )

    var url = 'file://' + path.join(__dirname, '..', '..') + '/index.html'

    window.loadURL(url)

    window.webContents.on('did-finish-load', function(){
        window.webContents.send('loaded', {
            appName: json.name,
            electronVersion: process.versions.electron,
            nodeVersion: process.versions.node,
            chromiumVersion: process.versions.chrome
        })
    })

    window.on('closed', function()
    {
        window = null
    })


    const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize

    function isMaximized(window)
    {
        let result = false

        if (window)
        {
            const [windowWidth, windowHeight] = window.getSize()

            result = (window.isMaximized() || (windowWidth === width && windowHeight === height))
        }

        return result
    }

    const previousSize =
    {
        width: null,
        height: null
    }

    electron.ipcMain.on('request', function(event, req)
    {
        if (req === 'maximize')
        {
            // Frameless windows don't track the "maximized" state,
            // hence we're going to check window size:
            if (isMaximized(window))
            {
                // This won't work for the same reason (frameless window):
                // window.restore()

                window.setSize(previousSize.width || json.settings.width || 1024,
                               previousSize.height || json.settings.height || 768,
                               true)
            }
            else
            {
                const currentSize = window.getSize()

                previousSize.width = currentSize.width
                previousSize.height = currentSize.height

                window.maximize()
            }
        }
        else if (req === 'minimize')
        {
            window.minimize()
        }
        else if (req === 'close')
        {
            window.close()
        }
    })
})
