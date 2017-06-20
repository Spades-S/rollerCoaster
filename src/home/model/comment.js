 'use strict'
 class Comment extends think.model.base {
     init(...args) {
         super.init(...args);
         this.tableName = 'T_COMMENT';
     }
     async addComment(userid, articleid, content, timestamp) {
         try {
             let insertId = await this.add({ "userid": userid, "articleid": articleid, "content": content, "timestamp": timestamp });
             return insertId
         } catch (e) {
             think.log(`add user cause wrong ${e}`);
             return false;
         }
     }


 }

 export default Comment;