export const elements = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchResList: document.querySelector('.results__list'),
    searchResPages: document.querySelector('.results__pages'),
    searchRes: document.querySelector('.results'),
    recipe: document.querySelector('.recipe'),
    shoppingList: document.querySelector('.shopping__list'),
}

export const elementStrings = {
    loader: 'loader'
}

export const renderLoader = parent => {
    const loader = `
        <div class='${elementStrings.loader}'>
            <svg>
                <use href='img/icons.svg#icon-cw'></use>
            </svg>
        </div>
    `
    parent.insertAdjacentHTML('afterbegin', loader);
}

const createButton = (page, type) => {
    return `
        <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev'? page - 1: page + 1}>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-${type === 'prev'? 'left': 'right'}"></use>
            </svg>
            <span>Page ${type === 'prev'? page - 1: page + 1}</span>
        </button>
    `
}

export const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil( numResults / resPerPage);
    let button;

    if(page == 1 && pages > 1){
        button = createButton(page, 'next');
    } else if( page < pages){
        button = `
            ${createButton(page, 'next')},
            ${createButton(page, 'prev')}
        `
    } else if( page === pages && pages > 1){
        button = createButton(page, 'prev');
    }

    elements.searchResPages.insertAdjacentHTML('afterbegin', button)
}

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`)
    if(loader){
        loader.parentElement.removeChild(loader)
    }
}
