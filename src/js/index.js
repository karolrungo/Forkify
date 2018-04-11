import axios from 'axios';

async function getResults(query) {
    const proxy = `https://cors-anywhere.herokuapp.com/`;
    const key = `3708c059aa5e73f41d1895174c25f13e`;
    try{
        const res = await axios(`${proxy}http://food2fork.com/api/search?key=${key}&q=${query}`)
    console.log(res.data.recipes)
    } catch(error){
        alert(error)
    }
}

getResults('pizza');