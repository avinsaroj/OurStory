export interface ReplyCommentModel {
    id: number
    Content: string,
    published: boolean,
    createdOn: Date
    createdBy: string,
    updatedOn: Date
    updatedBy: string
    publishedAt: Date
    userId: string,
    commentId: number
}
