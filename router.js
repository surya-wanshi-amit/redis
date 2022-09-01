const express = require("express")
const activity = require("./model/activity.js");
const {createClient}= require("redis");
const router = express.Router();

let redisClient;
(async () => {
    redisClient = createClient();
    redisClient.on("error", (error) => console.error(`Error : ${error}`));
    await redisClient.connect();
  })();

router.get("/activity/search/:id",async (req, res)=>{
  console.log("id",req.params.id)
  let data = req.params.id;
  let results;
  let isCached = false;

  try {

    const cacheResults = await redisClient.get(data);

    if (cacheResults)
    {
       isCached = true;
       results = JSON.parse(cacheResults);
    } else {
    
      results = await activity.findOne({where:{id:req.params.id}})

      if (!results) {
        throw "Data Not Found"
      }
      await redisClient.set(data, JSON.stringify(results));
    }

    res.send({
      fromCache: isCached,
      data: results,
    });
  } catch (error) {
    res.send(error);
  }
}
)


module.exports = router;