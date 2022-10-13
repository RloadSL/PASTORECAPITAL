import { Comments } from "domain/Comments/comments";
import { User } from "domain/User/User";
import { CommentDto, ParentCommentDto } from "infrastructure/dto/comments.dto";
import FireFirestore from "../firebase/firestore.firebase";
import { UserRepositoryImplInstance } from "./users.repository";


class CommentsImpl {
  private static instance: CommentsImpl;
  readonly commentsPath = 'comments';
  readonly replayPath = 'replay';
  private constructor() { };

  public static getInstance(): CommentsImpl {
    if (!CommentsImpl.instance) {
      CommentsImpl.instance = new CommentsImpl();
    }
    return CommentsImpl.instance;
  }

  private async parseCommentsSnapShot(cSnap:any){
    const promises = cSnap.map(async (c:any) => {
      const comment: CommentDto = { ...c.data(), id: c.id } as CommentDto;
      comment.owner = await UserRepositoryImplInstance.read(comment.owner as string) as User;
      return new Comments(comment) 
    });

    return Promise.all(promises);
  }

  async createComments(comment: CommentDto) : Promise<Comments | undefined> {
    try {
      const cRef = await FireFirestore.createDoc(this.commentsPath, comment);
      const commentDto = await FireFirestore.getDoc(this.commentsPath, cRef.id)
      const result = await this.parseCommentsSnapShot([commentDto]);
      return result[0]
    } catch (error) {
      console.error(error)
      alert('Error inteno en comments.repository')
    }
  }

 
  async getComments(parent: ParentCommentDto, lastSnap?: any): Promise<{comments: Comments[], lastSnapshot: any}> {
    try {
      const conditions = [['parent.id', '==', parent.id as string]]
      const cSnap = await FireFirestore.getCollectionDocs(this.commentsPath, lastSnap, conditions);
      
      if (cSnap && cSnap?.length > 0) {
        const result = await this.parseCommentsSnapShot(cSnap);
        return {comments: result, lastSnapshot: cSnap[cSnap?.length -1]};
      } else {
        return {comments: [] , lastSnapshot: null};
      }

    } catch (error) {
      console.error(error)
      alert('Error inteno en comments.repository')
      return {comments: [] , lastSnapshot: null};
    }
  }


  async updateComments(comment: string, id: string) {
    try {
      await FireFirestore.setDoc(this.commentsPath, id, { comment })
    } catch (error) {
      console.error(error)
      alert('Error inteno en comments.repository')
    }
  }

  async updateCommentsReplay(comment: string, id: string, parent_comment_id: string) {
    try {
      const path = `${this.commentsPath}/${parent_comment_id}/${this.replayPath}`
      const c = await FireFirestore.setDoc(path, id, { comment });
      return c;
    } catch (error) {
      console.error(error)
      alert('Error inteno en comments.repository')
    }
  }

  async deleteComments(comment: string, id: string) {
    try {
      await FireFirestore.deleteDoc(this.commentsPath, id)
    } catch (error) {
      console.error(error)
      alert('Error inteno en comments.repository')
    }
  }

  async deleteCommentsReplay(comment: string, id: string, parent_comment_id: string) {
    try {
      const path = `${this.commentsPath}/${parent_comment_id}/${this.replayPath}`
      const c = await FireFirestore.deleteDoc(path, id);
      return c;
    } catch (error) {
      console.error(error)
      alert('Error inteno en comments.repository')
    }
  }


}

export const CommentsImplInstance = CommentsImpl.getInstance();