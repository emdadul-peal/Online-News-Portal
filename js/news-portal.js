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
        // console.log(element);
        const idContainerDiv = document.createElement('div');
        idContainerDiv.classList.add('row')
        idContainerDiv.innerHTML = `
        <div class="shadow m-2 bg-body rounded d-flex p-3" >
            <img src=" ${element.thumbnail_url ? element.thumbnail_url : 'No image found'} " class="img-fluid rounded-start"  alt="...">
            <div class="card-body p-3">
                <div style="height: 200px;">
                    <h5 class="card-title">${element.title}</h5>
                    <p class="card-text"> ${element.details ? element.details.slice(0, 600) : 'No details found'}.... </p>
                </div>
                <div class="d-flex ">
                    <div class="card" style="width: 4rem;">
                        <img src="${element.author.img ? element.author.img : ''}" class="card-img-top" alt="...">
                    </div>
                    <div>
                            <p class="card-text">${element.author.name ? element.author.name : 'No data available'}</p>
                            <p class="card-text ms-4">${element.author.published_date}</p>
                    </div>
                    <div>
                        <p class ="card-text ms-5">${element.total_view ? element.total_view + ' ' + 'views' : 'No data available'}</p>
                    </div>
                    <div class="ms-5">
                   <button onclick ="loadNewsId('${element.news_id}')" class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
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
const loadNewsId = async (news_id) => {
    const url = ` https://openapi.programming-hero.com/api/news/${news_id}`
    const res = await fetch(url)
    const data = await res.json();
    displayNewsId(data.data);
}

const displayNewsId = id => {
    console.log(id)
    const modalTitle = document.getElementById('exampleModalLabel');
    modalTitle.innerText = id.author;

    // ids.forEach(id => {
    //     const newsModalDiv = document.createElement('div');
    //     newsModalDiv.classList.add('modal-dialog')
    //     newsModalDiv.innerHTML = `
    //     <div class="modal-content">
    //         <div class="modal-header">
    //             <h1 class="modal-title fs-5" id="exampleModalLabel"></h1>
    //             <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    //         </div>
    //         <div class="modal-body">
    //             ...
    //         </div>
    //         <div class="modal-footer">
    //             <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    //             <button type="button" class="btn btn-primary">Save changes</button>
    //         </div>
    //     </div>
    // `;
    //     newsIdModal.appendChild(newsModalDiv);
    // })
}

loadNewsCategories();




