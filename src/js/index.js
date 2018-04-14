import Search from './models/Search'
import Recipe from './models/Recipe'
import List from './models/List'
import {elements, renderLoader, clearLoader} from './views/base'
import * as searchView from './views/searchView'
import * as recipeView from './views/recipeView'

const state = {}

//SEARCH CONTROLLER
const controlSearch = async () => {
    const query = searchView.getInput()
    //console.log(query)

    if(query){
        state.search = new Search(query)

        searchView.clearInput()
        searchView.clearResults()
        renderLoader(elements.searchRes)

        try{
        await state.search.getResults();

        searchView.renderResults(state.search.result)
        clearLoader()
        //console.log(state.search.result)
        } catch(error){
            alert("Error processing search!")
            clearLoader()
        }
    }
}

elements.searchForm.addEventListener('submit', e =>{
    e.preventDefault();
    controlSearch();
})

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline')
    if(btn){
        const goToPage = parseInt(btn.dataset.goto, 10)
        searchView.clearResults()
        searchView.renderResults(state.search.result, goToPage)
    }
})

//RECIPE CONTROLLER

const controlRecipe = async () => {
    const id = window.location.hash.replace('#' , '')
    console.log(id)

    if(id){

        state.recipe = new Recipe(id)

        try{
            recipeView.clearResults()
            renderLoader(elements.recipe)

            if( state.search){
                searchView.highlightSelected(id)
            }
            
            await state.recipe.getRecipe()
    
            state.recipe.calcServings()
            state.recipe.calcTime()
            state.recipe.parseIngredients()
    
            clearLoader()
            recipeView.renderRecipe(state.recipe)
            console.log(state.recipe)
        } catch(error){
            alert(error)
            clearLoader()
        }
        
    }
}

//window.addEventListener('hashchange', controlRecipe);
//window.addEventListener('load', controlRecipe);

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe))

elements.recipe.addEventListener('click', e => {
    const btn = e.target.closest('.btn-tiny')
    if(e.target.matches('.btn-decrease, .btn-decrease *')){
        state.recipe.updateServings('dec')
        recipeView.renderRecipe(state.recipe)
    }
    if(e.target.matches('.btn-increase, .btn-increase *')){
        state.recipe.updateServings('inc')
        recipeView.renderRecipe(state.recipe)
    }
})

window.l = new List()