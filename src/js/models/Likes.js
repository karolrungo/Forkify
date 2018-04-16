export default class Likes{
    constructor(){
        this.likes = [];
    }

    addLike(id, title,author, image){
        const like = {
            id,
            title,
            author,
            image
        }
        this.likes.push(like)
        this.persistData()

        return like
    }

    deleteLike(id){
        const index = this.likes.findIndex(el => el.id === id)
        this.likes.splice(index, 1)
        this.persistData()
    }

    isLiked(id){
        const index = this.likes.findIndex(el => el.id === id)
        return index === -1 ? false : true
    }

    getNumLikes() { return this.likes.length }

    persistData() {
        localStorage.setItem('likes', JSON.stringify(this.likes)) 
    }

    readDataFromLocalStorage(){
        const storage = JSON.parse(localStorage.getItem('likes'))
        if(storage){
            this.likes = storage;
        }
    }
}