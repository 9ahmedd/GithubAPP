// Setut Vars

let userFormEl = document.querySelector('#user-form');
// let userFormEl = document.getElementById("user-form");
let userInputEl = document.querySelector('#username');
// let userInputEl = document.getElementById("username");
let languagesEl = document.querySelector('.languages');
// let languagesEl = document.getElementById("languages");
let searchTermEl = document.querySelector('#search-term');
// let searchTermEl = document.getElementById("search-term");
let reposEl = document.querySelector('#repos');
// let reposEl = document.getElementById("repos");

// Events
userFormEl.addEventListener('submit', formSubmitHandler);

// Functions

function formSubmitHandler(e) {
    e.preventDefault();

    let user = userInputEl.value.trim();

    if (user) {
        reposEl.innerHTML = ""
       getUserRepos(user)
    } else {
        alert("please Enter user")
    }
}

function getUserRepos(user) {
    let apiUrl = "https://api.github.com/users/" + user + "/repos";
    fetch(apiUrl)
        .then(res => res.json())
        .then(data => displayRepos(data,user))
        .catch(err => alert("Somthing Wrong !"))
}

function displayRepos(repos,searchTerm) {
    searchTermEl.innerHTML = searchTerm;
    const repoItems = repos.map(repo => `
    <a href="#" class="repo-item">
        <span>${repo.owner.login} / ${repo.name}</span>
        <span>${repo.open_issues_count > 0 ? '<i class="fas fa-times"></i>' : '<i class="fas fa-check-square"></i>'}</span>
    </a> 
`).join('');

reposEl.innerHTML = repoItems;
}