const axios = require('axios');
const fs = require('fs');

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function getTracks(after = null) {
    var afterObj = {};
    if(after) {
        afterObj = {after: after};
    }

  return await axios.get("https://nations.tm-exchange.com/api/tracks", {
    params: {
      order1: 6,
      count: 1000,
      ...afterObj,
      fields: "TrackId,TrackName,Authors[],Tags[],AuthorTime,Routes,Difficulty,Environment,Car,PrimaryType,Mood,Awards,HasThumbnail,Images[],IsPublic,WRReplay.User.UserId,WRReplay.User.Name,WRReplay.ReplayTime,WRReplay.ReplayScore,ReplayType,Uploader.UserId,Uploader.Name"
    }
  });
}

var countPage = 1;
async function getTracksLoop(afterId = null) {
    if (!fs.existsSync("pages")){
        fs.mkdirSync("pages");
    }
    const {data} = await getTracks(afterId);
    fs.writeFileSync(`pages/page${countPage}.json`, JSON.stringify(data));
    if(data.More){
        console.log("Done page " + countPage);
        countPage++;
        //sleep(1000);
        await getTracksLoop(data.Results[data.Results.length - 1].TrackId);
    }else{
        console.log("Final done");
        countPage = 1;
    }
}

module.exports = getTracksLoop;