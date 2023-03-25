import { LikeDislikeModel } from "./like-dislike-model";

export interface CommanModelForPost {
     id:number ,
     parentId:number  ,
     title:string ,
     metaTitle:string ,
     slug :string,
     likeCount:number  ,
     dislikeCout:number  ,
     summary:string ,
     published:boolean ,
     createdOn:Date ,
     createdBy:string ,
     updatedOn:Date ,
     updatedBy:string ,
     publishedAt:Date ,
     content:string ,
     userId:string , 
     commentModels:CommanModelForPost[],
     likeDislikeModels:LikeDislikeModel[]
}
