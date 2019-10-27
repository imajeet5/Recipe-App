export default class Likes {
     constructor(){
          this.likes = [];
     }

     persistData() {
          localStorage.setItem('likes', JSON.stringify(this.likes));
     }

     readStorage() {
          const storage = JSON.parse(localStorage.getItem('likes'));

          //Restoring likes from the localStorage
          if(storage) this.likes = storage;
     }

     addLike(id, title, author, img) {
          const likeObject = {id, title, author, img};
          this.likes.push(likeObject);

          //Storing Data in local Storage
          this.persistData()

          return likeObject;          
     }

     isLiked(id) {
          return this.likes.findIndex(el =>
               el.id === id) !== -1;
     }

     deleteLike(id){
          const index = this.likes.findIndex(el => el.id === id);
          this.likes.splice(index, 1);

          //Update data in localStorage
          this.persistData();
     }
     getNumLikes() {
          return this.likes.length;
     }
}