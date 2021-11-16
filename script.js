const API_URL = 'https://api.github.com/users/'  //user/username/repos

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')
//getUser('hugoresende27')
/**  //////////////////////////////////////////////////////////////////////////////////////// */
async function getUser(username) {
    try{
        const { data } = await axios(API_URL + username)
        //console.log(data)
        createUserCard(data)
        getRepos(username)
    } catch (err) {
        //console.log(err)
        if (err.response.status == 404) {
            createErrorCard('Nenhum perfil encontrado com este username')
        }
        
    }

    //const res = await axios(API_URL + username)
    // .then(res => console.log(res.data))
    // .catch (err => console.log(err))
    
}

async function getRepos(username) {
    try{
        const { data } = await axios(API_URL + username + '/repos?sort=created')
        addReposToCard(data)
        getRepos(username)
    } catch (err) {
        //console.log(err)
            createErrorCard('Problema no fetching dos repos') 
    }
}

function createUserCard(user) {
    const cardHTML = `
    <div id="card">
    <div>
        <img src="${user.avatar_url}" alt="${user.name}" class="avatar">
    </div>
    <div class="user-info">
        <h2>${user.name}</h2>
        <p>${user.bio}</p>
        <ul>
            <li>${user.followers}<strong>Seguidores&nbsp&nbsp&nbsp</strong></li>
            <li>${user.following}<strong>A seguir&nbsp&nbsp&nbsp</strong></li>
            <li>${user.public_repos}<strong>Repositórios</strong></li>
        </ul>

        <div id="repos">
           
        </div>
    </div>
</div>
    `
    main.innerHTML = cardHTML
}

function createErrorCard (msg) {
    const cardHTML = `
    <div class="card">
        <h1>${msg}</h1>
    </div>
    `

    main.innerHTML = cardHTML
}

function addReposToCard(repos) {
    const reposEl = document.getElementById('repos')

    repos
        .slice(0,10)
        .forEach (repo => {
        const repoEl = document.createElement('a')
        repoEl.classList.add('repo')
        repoEl.href = repo.html_url
        repoEl.target = '_blank'
        repoEl.innerText = repo.name

        reposEl.appendChild(repoEl)
    })
}


/**  //////////////////////////////////////////////////////////////////////////////////////// */

form.addEventListener('submit', (eve) => {
    eve.preventDefault()
    const user = search.value

    if (user) {
        getUser(user)
        search.value = ''
    }
})

