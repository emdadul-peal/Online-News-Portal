const loadNewsCategories = async () => {
    const url = ` https://openapi.programming-hero.com/api/news/categories`
    const res = await fetch(url)
    const data = await res.json()
    displayNewsCategory(data.data.news_category);

}

const displayNewsCategory = (contents) => {
    const newsCategory = document.getElementById('category-container')
    contents.forEach(content => {
        // console.log(content)
        const contentDiv = document.createElement('div')
        // contentDiv.classList.add('nav nav-tabs')
        contentDiv.innerHTML = `
        <button onclick="loadContents('${content.category_id}')" class="nav-link active p-5" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home"
            type="button" role="tab" aria-controls="nav-home" aria-selected="true"> ${content.category_name} </button>
        `;
        newsCategory.appendChild(contentDiv);
    });
}

const loadContents = async (category_id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`
    const res = await fetch(url);
    const data = await res.json()
    displayContents(data.data)
}

const displayContents = elements => {
    // console.log(elements)
    const categoryIdContainer = document.getElementById('category-id-container');
    categoryIdContainer.innerHTML = ``;
    elements.forEach(element => {
        console.log(element);
        const idContainerDiv = document.createElement('div');
        idContainerDiv.classList.add('row')
        idContainerDiv.innerHTML = `
        <div class="shadow m-2 bg-body rounded d-flex p-3" >
            <img src=" ${element.thumbnail_url} " class="img-fluid rounded-start"  alt="...">
            <div class="card-body p-3">
                <div style="height: 200px;">
                    <h5 class="card-title">${element.title}</h5>
                    <p class="card-text"> ${element.details.slice(0, 600)}.... </p>
                </div>
                <div class="d-flex ">
                    <div class="card" style="width: 4rem;">
                        <img src="${element.author.img}" class="card-img-top" alt="...">
                    </div>
                    <div>
                            <p class="card-text">${element.author.name}</p>
                            <p class="card-text ms-4">${element.author.published_date}</p>
                    </div>
                </div>
            </div>
        </div>
        `;
        categoryIdContainer.appendChild(idContainerDiv);
    })
}

loadNewsCategories();