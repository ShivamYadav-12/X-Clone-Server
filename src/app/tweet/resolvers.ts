import { Tweet } from "@prisma/client";
import { prismaClient } from "../../clients/db";
import { GraphqlContext } from "../../interfaces";
import { S3Client,PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import UserService from "../services/user";
import TweetService, { createTweetPayload } from "../services/tweet";


const s3Cient = new S3Client({
    region: process.env.AWS_DEFAULT_REGION
})
const queries= {
    getAllTweets :() => TweetService.getAllTweets(),
    getSignedURLForTweet: async (parent:any ,{imageName ,imageType}:{imageName:string,imageType: string},ctx :GraphqlContext) =>{
        if(!ctx.user || !ctx.user.id) throw new Error("non authenicated user");
        const allowedImageTypes =['image/jpg','image/jpeg','image/png','image/webp']
        if(!allowedImageTypes.includes(imageType)) throw new Error("Unsupported Image Type")
    const pushObjectCommand = new PutObjectCommand({
Bucket:process.env.AWS_S3_BUCKET,
Key:`uploads/${ctx.user.id}/tweets/${imageName}-${Date.now()}.${imageType}}`

})
const signedURL = await getSignedUrl(s3Cient,pushObjectCommand)
return signedURL


    }
}

const mutations = 
{
    createTweet :async(parent:any,{payload}:{payload:createTweetPayload},ctx:GraphqlContext)=>{
        if(!ctx.user) throw new Error("you arenot authenicated");
     const tweet = await TweetService.createTweet({...payload, userId: ctx.user.id})
    }

}
const extraResolver  = {
    Tweet:{
        author :(parent: Tweet) =>UserService.getUserById(parent.authorId)
    },
}
export const resolvers = {mutations,extraResolver,queries}