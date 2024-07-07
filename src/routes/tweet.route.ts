import { Router } from "express";
import { getTweetController,createTweetController,deleteTweetController,updateTweetController } from "../controllers/tweet.controller";

const tweetRouter=Router();

//define route paths

tweetRouter.get("/:tweetId",getTweetController)
//tweetRouter.get("/",getAllTweetsController)
tweetRouter.post("/",createTweetController)
tweetRouter.delete("/:tweetId",deleteTweetController)
tweetRouter.put("/",updateTweetController)

export default tweetRouter