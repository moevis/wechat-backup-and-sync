document.addEventListener('DOMContentLoaded', function () {
    chrome.tabs.query({ url: 'https://wx2.qq.com/'}, function(tab) {
        console.log(tab);
        chrome.cookies.get({ url: tab[0].url, name: 'wxuin' }, function(cookies) {
            console.log(cookies);
            console.log(cookies.value);
        });
    });

});