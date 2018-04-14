import {elements, renderButtons} from './base'

export const getInput = () => {
    return elements.searchInput.value;
}

const renderRecipe = recipe => {
    const markup = `
    <li>
        <a class="results__link" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="recipe_img">
            </figure>
            <div class="results__data">
            <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
            <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>`
    elements.searchResList.insertAdjacentHTML('beforeend', markup)
}

export const renderResults = (recipes, page=2, resPerPage=10) => {
    const start = (page-1) * resPerPage;
    const end = page * resPerPage;

    recipes.slice(start, end).forEach( renderRecipe )

    renderButtons(page, recipes.length, resPerPage)
}

export const clearInput = () => {
    elements.searchInput.value = ''
}

export const clearResults = () => {
    elements.searchResList.innerHTML = ''
    elements.searchResPages.innerHTML = ''
}

const limitRecipeTitle = (title, limit = 16) => {
    const newTitle = []
    if( title.length > limit){
        title.split(' ').reduce((acc, cur) => {
            if( acc + cur.length <= limit){
                newTitle.push(cur);
            }
            return acc + cur.length
        }, 0)

        return `${newTitle.join(' ')} ...`
    } else {
        return title
    }
}

export const highlightSelected = id => {
    const resultsLinks = Array.from(document.querySelectorAll('.results__link'))
    console.log(resultsLinks)
    resultsLinks.forEach( link => link.classList.remove('results__link--active'))
    
    document.querySelector(`a[href="#${id}"]`).classList.add('results__link--active')
}

