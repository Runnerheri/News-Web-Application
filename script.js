const API_KEY = "56af6233309b49c7afe3355d040baf61"
const url = "https://newsapi.org/v2/everything?q="


async function fetchData(query){
    const result = await fetch(`${url}${query}&apiKey=${API_KEY}`)
    const data = await result.json()
    return data
}

fetchData("all").then(data => renderMain(data.articles))

//menubtn
let mobilemenu = document.querySelector(".mobile")
let menubtn = document.querySelector(".menubtn")
let menubtnDisplay = true

menubtn.addEventListener("click",()=>{
    if(menubtn){
        mobilemenu.classList.toggle("hidden")
    }
})

//render news
function renderMain(arr){
   
    let mainHTML = ''

    for(let i=0; i<arr.length; i++){
        if(arr[i].urlToImage){
            mainHTML += ` <div class="card">
                            <a href=${arr[i].url}> 
                            <img src=${arr[i].urlToImage} lazy="loading"/>
                            <h4>${arr[i].title}</h4>
                            <div class="">
                                <p>${arr[i].source.name}</p>
                                <p>${new Date(arr[i].publishedAt).toLocaleDateString()}</p>
                            </div>
                            <div class="description">
                                ${arr[i].description}
                            </div>
                        </a>
                        </div>`
        }
    }
    document.querySelector("main").innerHTML = mainHTML
}

const searchBtn = document.getElementById("searchForm") 
const searchBtnMobile = document.getElementById("searchFormMobile")
const searchInputMobile = document.getElementById("searchInputMobile") 
const searchInput = document.getElementById("searchInput")

searchBtn.addEventListener("submit", async(e)=>{
    e.preventDefault()
    console.log(searchInput.value)

    const data = await fetchData(searchInput.value)
    renderMain(data.articles)
})

searchBtnMobile.addEventListener("submit", async(e)=>{
    e.preventDefault()
    const data = await fetchData(searchInputMobile.value)
    renderMain(data.articles)
})

async function Search(query){
    const data = await fetchData(query)
    renderMain(data.articles)
}
