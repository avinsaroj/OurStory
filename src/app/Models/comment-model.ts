import { ReplyCommentModel } from "./reply-comment-model";

export interface CommentModel {
    id: number,
    content: string,
    published: boolean,
    createdOn: Date,
    createdBy: string,
    updatedOn: Date,
    updatedBy: string,
    publishedAt: Date,
    userId: string,
    postId: number,
    replyCommentModel:ReplyCommentModel[]
}
