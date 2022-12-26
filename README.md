
## TM Exchange Downloader

This is a simple script to download all the files from the TM Exchange. It is written in Node js and uses the requests library "Axios" to make the requests.

### Usage

npm install
edit app.js
node app.js

Default app.js:
```
const getTracksLoop = require("./utils/PageToJson.js");
const downloadMaps = require("./utils/DownloadMapJson.js");

async function main() {
    await getTracksLoop();
    console.log("done all PAGES");
    await downloadMaps("page1.json");
    console.log("done all MAPS for page1.json");
}
main();
```

Future plans:
- Add a config file
- Add a GUI (maybe with Electron)
- Add a way to download only newest maps 
- Add a way to download only maps from a specific author
- Using worker api to download maps in parallel




