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
        chrome.storage.local.set({userSites: userSites}, () => {
            console.log('User sites have been saved.');
        });
    });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getUserSites') {
        chrome.storage.local.get('userSites', (data) => {
            sendResponse({userSites: data.userSites});
        });
        return true; // to indicate that the response is asynchronous
    }
});