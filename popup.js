document.addEventListener('DOMContentLoaded', function() {
    let searchBar = document.getElementById('search-bar');
    searchBar.addEventListener('input', function() {
        search(searchBar.value);
    });

    chrome.runtime.sendMessage({action: 'getUserSites'}, (response) => {
        let userSites = response.userSites;
        let ul = document.getElementById('account-list');
        for (let i = 0; i < userSites.length; i++) {
            let li = document.createElement('li');
            li.textContent = userSites[i];
            ul.appendChild(li);
        }
    });
});

function search(query) {
    let listItems = document.querySelectorAll('#account-list li');
    for (let i = 0; i < listItems.length; i++) {
        if (!listItems[i].textContent.includes(query)) {
            listItems[i].style.display = 'none';
        } else {
            listItems[i].style.display = '';
        }
    }
}