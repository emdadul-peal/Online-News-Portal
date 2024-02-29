const loadNewsCategories = async () => {
    const url = ` https://openapi.programming-hero.com/api/news/categories`
    const res = await fetch(url)
    const data = await res.json()
    displayNewsCategory(data.data.news_category);

}

const displayNewsCategory = (contents) => {
    const newsCategory = document.getElementById('category-container')
    // all news contents:-
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
    // start loader
    document.getElementById('nav-home-tab').addEventListener('click', function () {
        toggleSpinner(true);
    })

}

// news count : 







const loadContents = async (category_id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`
    const res = await fetch(url);
    const data = await res.json()
    displayContents(data.data);

    // sorting views count:

    const newArr = data.data.map(view => view.total_view);
    // console.log(newArr);
    const sortedArr = newArr.sort(function (a, b) {
        return b - a;
    });
    let finalArr = [];
    for (const view of sortedArr) {
        const sortedNews = data.data.find(content => content.total_view === view);
        // console.log(sortedNews);
        finalArr.push(sortedNews);
    }
    // console.log(finalArr);
    displayContents(finalArr);
}

const displayContents = elements => {
    // console.log(elements)
    const categoryIdContainer = document.getElementById('category-id-container');
    categoryIdContainer.innerHTML = ``;

    //Total news count: 
    const totalNewsCount = document.getElementById('exampleFormControlInput1');
    totalNewsCount.placeholder = `${elements.length ? elements.length + ' ' + 'news found for this category' : 'No news found'}`;

    elements.forEach(element => {
        // console.log(element);
        const idContainerDiv = document.createElement('div');
        idContainerDiv.classList.add('row')
        idContainerDiv.innerHTML = `
        <div class="shadow m-2 bg-body rounded d-flex p-3" >
            <img src=" ${element.thumbnail_url ? element.thumbnail_url : 'No image found'} " class="img-fluid rounded-start"  alt="...">
            <div class="card-body p-3">
                <div style="height: 200px;">
                    <h5 class="card-title">${element.title}</h5>
                    <p class="card-text text-start"> ${element.details ? element.details.slice(0, 600) : 'No details found'}.... </p>
                </div>
                <div class="d-flex justify-content-between">
                    <div class="d-flex">
                        <div class="card" style="width: 4rem;">
                            <img src="${element.author.img ? element.author.img : ''}" class="card-img-top" alt="...">
                        </div>
                        <div>
                            <p class="card-text ms-4 text-start">${element.author.name ? element.author.name : 'No data available'}</p>
                            <p class="card-text ms-4 text-start">${element.author.published_date}</p>
                        </div>
                    </div>
                    <div class="">
                        <p class ="card-text ms-5">${element.total_view ? element.total_view + ' ' + 'views' : 'No data available'}</p>
                    </div>
                    <div class="">
                        <button onclick ="loadNewsId('${element._id}')" class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
                    </div>
                </div>
            </div>
        </div>
        `;
        categoryIdContainer.appendChild(idContainerDiv);
    })
    toggleSpinner(false);
}

// spinner: 
const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    }
    else {
        loaderSection.classList.add('d-none');
    }
}

// modal:
const loadNewsId = async (id) => {
    const url = `https://openapi.programming-hero.com/api/news/${id}`
    const res = await fetch(url);
    const data = await res.json();
    displayNewsId(data.data[0]);
}

const displayNewsId = id => {
    // console.log(id);
    const modalTitle = document.getElementById('exampleModalLabel');
    modalTitle.innerText = id.author['name'] ? id.author.name : 'No name found';
    const modalBody = document.getElementById('modalBody')
    modalBody.innerText = id.details.slice(0, 200) + '...';
    const modalFooter = document.getElementById('published-date')
    modalFooter.innerText = 'Published Date: ' + id.author.published_date;
}

loadNewsCategories();





