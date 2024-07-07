import mongoose, {Document,Schema} from "mongoose";
import { ITweetInterface } from "../interfaces/tweet.interface";

const userSchema=new Schema<ITweetInterface>({
    tweetid: {type: String, required: true},
    adminId: {type: String, required: true},
    content:{type: String, default: ""},
    createdAt:{type: String, required: true},
});

const TweetModel=mongoose.model<ITweetInterface>("TweetModel",userSchema);
export default TweetModel;
