import { Request, Response } from "express";
import { getTweetRepo, createTweetRepo, deleteTweetRepo, updateTweetRepo } from "../repositories/tweet.repository";
import { updateUserWithTweetIdrepo } from "../repositories/user.repository";
import { ITweetInterface } from "../database/interfaces/tweet.interface";

export const getTweetController = async (req: Request, res: Response) => {
    const tweetId = req.params.tweetId as string;
    try {
        const tweet = await getTweetRepo(tweetId)
        if (tweet) {
            res.status(200).json({ data: tweet })
        } else {
            res.status(500).json({ error: "Tweet not found" });
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error });

    }
}

export const createTweetController = async (req: Request, res: Response) => {
    const tweet: ITweetInterface = req.body;
    try {
        const success = await createTweetRepo(tweet)
        if (success) {
            const userUpdateSuccess = await updateUserWithTweetIdrepo(tweet.adminId, tweet.tweetid);
            if (userUpdateSuccess) {
                res.status(200).json({ data: tweet });
            } else {
                res.status(500).json({ error: "User not updated" });
            }

        } else {
            res.status(500).json({ error: "Tweet not created" });
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error });

    }
}

export const updateTweetController = async (req: Request, res: Response) => {
    const updatedTweet: ITweetInterface = req.body;
    try {
        const success = await updateTweetRepo(updatedTweet.tweetid, updatedTweet)
        if (success) {
            res.status(200).json({ data: "tweet updated" })
        } else {
            res.status(500).json({ error: "Tweet not updated" });
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error });

    }
}

export const deleteTweetController = async (req: Request, res: Response) => {
    const tweetId = req.params.tweetId as string;
    try {
        const success = await deleteTweetRepo(tweetId)
        if (success) {
            res.status(200).json({ data: "tweet deleted" })
        } else {
            res.status(500).json({ error: "Tweet not deleted" });
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error });

    }
} 