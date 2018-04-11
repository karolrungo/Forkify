import axios from 'axios';

export default class Search{
    constructor(query){
        this.query = query;
    }

    async getResults() {
        const proxy = `https://cors-anywhere.herokuapp.com/`;
        const key = `3708c059aa5e73f41d1895174c25f13e`;
        try{
            const res = await axios(`${proxy}http://food2fork.com/api/search?key=${key}&q=${this.query}`)
            this.result = res.data.recipes
        }
        catch(error){
            alert(error)
        }
    }
}