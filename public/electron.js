// Module to control the application lifecycle and the native browser window.
const { app, BrowserWindow, dialog } = require('electron');
const getLoc = require('electron-get-location');

const path = require('path');
const url = require('url');

// Créer la fenêtre principale
let mainWindow;

// Create the native browser window.
function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: './public/assets/icons/favicon.ico',

    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
    },
  });

  const { Menu } = require('electron');

  const template = [
    {
      label: 'Fichier',
      submenu: [
        { label: 'Prévisions' },
        { label: 'Favoris' },
        { type: 'separator' },
        {
          label: 'Quitter',
          click() {
            app.quit();
          },
        },
      ],
    },
    {
      label: 'Aide',
      submenu: [{ label: 'A propos' }, { label: 'Documentation' }],
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  const appURL = app.isPackaged
    ? url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true,
      })
    : 'http://localhost:3000';
  mainWindow.loadURL(appURL);

  // Automatically open Chrome's DevTools in development mode.
  if (!app.isPackaged) {
    mainWindow.webContents.openDevTools();
  }
}

// This method will be called when Electron has finished its initialization and
// is ready to create the browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  // Créer une boîte de dialogue pour demander la position de l'utilisateur
  dialog
    .showMessageBox(mainWindow, {
      type: 'question',
      buttons: ['Oui', 'Non'],
      title: 'Obtenir votre position',
      message: 'Pouvez-vous partager votre position ?',
    })
    .then((result) => {
      // Si l'utilisateur accepte, utiliser le module navigator pour obtenir la position
      if (result.response === 0) {
        navigator.geolocation.getCurrentPosition((position) => {
          console.log('Latitude :', position.coords.latitude);
          console.log('Longitude :', position.coords.longitude);
        });
      }
    });

  getLoc.get((position) => {
    console.log(position);
  });
  getLoc.get({ enableHighAccuracy: true }, (position) => {
    console.log(position);
  });
  if (getLoc.isSupported()) {
    // géolocalisation prise en charge
  } else {
    // géolocalisation non prise en charge
  }
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
