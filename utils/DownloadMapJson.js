
const fs = require('fs');
const axios = require('axios');

console.log("Running DownloadMapJson.js");
async function downloadMap(pageFolder,trackData) {
    // create folder if not exist
    if (!fs.existsSync("maps/"+pageFolder)){
        fs.mkdirSync("maps/"+pageFolder);
    }
    const { TrackId,AuthorTime } = trackData;
    var minutes = Math.floor(AuthorTime / 60000);
    var seconds = ((AuthorTime % 60000) / 1000).toFixed(0);
    var timeFinishedAuthor = minutes + "m" + (seconds < 10 ? '0' : '') + seconds +"s";

    await axios.get(`https://nations.tm-exchange.com/trackgbx/${TrackId}`, {
        responseType: 'stream'
    }).then(response => {
        
    
        var contentDisposition = response.headers['content-disposition'];
        var filename = contentDisposition.split("filename*=UTF-8")[1].split(";")[0];
        filename = filename.replace(/["'`]/g, "").trim();

        const partsSplited = filename.split(/^(.*?)\./);
        filename = partsSplited[1]+ "["+timeFinishedAuthor+"]."+partsSplited[2];

        console.log("Downloading " + trackData.TrackId , filename);

        response.data.pipe(fs.createWriteStream(`maps/${pageFolder+"/"+filename}`));

    });
}

async function downloadMaps(jsonFile) {
    if (!fs.existsSync("maps")){
        fs.mkdirSync("maps");
    }
    if(!fs.existsSync("pages/"+jsonFile)){
        throw "File not found";
    }
    var {Results} = JSON.parse(fs.readFileSync(`pages/${jsonFile}`, 'utf8'));
    for(var i = 0; i < Results.length; i++) {
        var trackData = Results[i];
        await downloadMap(jsonFile.split(".json")[0],trackData);
    }
}

module.exports = downloadMaps;
