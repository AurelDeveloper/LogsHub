const fs = require('fs');

// Speichern der Daten in einer JSON-Datei
function saveData(data) {
    fs.writeFile('userSites.json', JSON.stringify(data), (err) => {
        if (err) throw err;
        console.log('User sites have been saved to a JSON file.');
    });
}

// Laden der Daten aus einer JSON-Datei
function loadData(callback) {
    fs.readFile('userSites.json', (err, data) => {
        if (err) throw err;
        callback(JSON.parse(data));
    });
}

chrome.runtime.onInstalled.addListener(() => {
    chrome.history.search({text: '', maxResults: 1000000}, (data) => {
        let userSites = [];
        for (let i = 0; i < data.length; i++) {
            let url = data[i].url;
            if (url.includes('/login') || url.includes('/signup') || url.includes('/register')) {
                let site = url.split('/')[2];
                site = site.replace('www.', ''); // Remove 'www.' from the site
                if (!userSites.includes(site)) {
                    userSites.push(site);
                }
            }
        }
        saveData(userSites);
    });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getUserSites') {
        loadData((data) => {
            sendResponse({userSites: data});
        });
        return true; // to indicate that the response is asynchronous
    }
    if (request.action === 'startSearch') {
        // Starten Sie die Suche hier
        chrome.history.search({text: '', maxResults: 1000000}, (data) => {
            let userSites = [];
            for (let i = 0; i < data.length; i++) {
                let url = data[i].url;
                if (url.includes('/login') || url.includes('/signup') || url.includes('/register')) {
                    let site = url.split('/')[2];
                    site = site.replace('www.', ''); // Remove 'www.' from the site
                    if (!userSites.includes(site)) {
                        userSites.push(site);
                    }
                }
            }
            saveData(userSites);
            sendResponse({result: 'Search started'});
        });
        return true; // to indicate that the response is asynchronous
    }
});