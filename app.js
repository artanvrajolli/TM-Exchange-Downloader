
const getTracksLoop = require("./utils/PageToJson.js");
const downloadMaps = require("./utils/DownloadMapJson.js");

async function main() {
    await getTracksLoop();
    console.log("done all PAGES");
    await downloadMaps("page1.json");
    console.log("done all MAPS for page1.json");
}

// 
// 

main();









