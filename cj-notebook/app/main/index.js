
const electron = require('electron');
const path = require('path');
const url = require('url');
const ChildProcess = require('child_process');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const shell = electron.shell;

app.setName('CJNotebook');

let mainWindow;


function createWindow() {
    // Create the browser window.
    const options = {
      title: 'CJNotebook',
      width: 1200,
      height: 786,
      minWidth: 1200,
      minHeight: 600,
      titleBarStyle: 'default',
      webPreferences: {
        nodeIntegration: true,
        webviewTag: true,
      },
    };
    if (process.platform === 'linux') {
      options.icon = path.join(__dirname, './resource/app.png');
    }
    if (process.platform === 'darwin') {
      options.transparent = true;
      options.frame = false;
      options.titleBarStyle = 'hidden';
    }
    mainWindow = new BrowserWindow(options);
    mainWindow.once('ready-to-show', () => {
      mainWindow.show();
    });
  
    mainWindow.setTitle('CJNotebook');
  
    // and load the index.html of the app.
    mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, './index.html'),
      hash: 'note',
      protocol: 'file:',
      slashes: true,
    }, {
      userAgent: 'CJNotebook',
    }));
  
    // 设置菜单
    //setMenu(mainWindow);
  
    // const explorerMenu = getExplorerMenuItem(mainWindow);
    // const exploereFileMenu = getExplorerFileMenuItem(mainWindow);
    // const projectItemMenu = getExplorerProjectItemMenu(mainWindow);
    // const fileItemMenu = getExplorerFileItemMenu(mainWindow);
  
    // eventListener({
    //   explorerMenu,
    //   exploereFileMenu,
    //   projectItemMenu,
    //   fileItemMenu,
    // });
  
    const webContents = mainWindow.webContents;
  
    webContents.on('will-navigate', (e, linkUrl) => {
      e.preventDefault();
      shell.openExternal(linkUrl);
    });
  
    webContents.on('new-window', (e, linkUrl) => {
      e.preventDefault();
      shell.openExternal(linkUrl);
    });
  
    // Emitted when the window is closed.
    mainWindow.on('close', () => {
      mainWindow = null;
      try {
        //removeEventListeners();
      } catch (err) {
        // err
      }
    });
  
    // 配置插件
    // if (process.env.NODE_ENV === 'development') {
    //   require('devtron').install();
    //   /* eslint-disable import/no-unresolved */
    //   const CONFIG = require('../../config/devconfig.json');
    //   const extensions = CONFIG.extensions;
    //   for (const ex of extensions) {
    //     BrowserWindow.addDevToolsExtension(ex);
    //   }
    //   /* eslint-enable */
    // }
  }
  
  // 只允许单个实例运行
  const gotTheLock = app.requestSingleInstanceLock();
  
  if (!gotTheLock) {
    app.quit();
  } else {
    app.on('second-instance', () => {
      // Someone tried to run a second instance, we should focus our window.
      if (mainWindow) {
        if (mainWindow.isMinimized()) {
          mainWindow.restore();
        }
        mainWindow.focus();
      }
    });
  
    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    app.on('ready', createWindow);
  }
  
  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    app.quit();
  });
  
  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
      createWindow();
    }
  });
  
  app.on('before-quit', () => {
  });
  
