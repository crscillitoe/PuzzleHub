const { app, BrowserWindow } = require('electron')

function createWindow () {
  // Create the browser window.
  let win = new BrowserWindow({ width: 1280, 
                                height: 800,
                                minHeight: 800,
                                minWidth: 1280
  })

  win.setMenuBarVisibility(false)
  win.maximize()
  //win.setFullScreen(true)

  win.loadURL('https://puzzle-hub.com/')
  win.once('ready-to-show', () => {
    win.show()
  })
}
  
app.on('ready', createWindow)
