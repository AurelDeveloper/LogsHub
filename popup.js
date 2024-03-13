document.addEventListener('DOMContentLoaded', function() {
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