document.addEventListener('DOMContentLoaded', function () {
    chrome.tabs.query({ url: 'https://wx2.qq.com/*'}, function(tab) {
        console.log(tab);
        chrome.cookies.get({ url: tab[0].url, name: 'wxuin' }, function(cookies) {
            console.log(cookies);
            console.log(cookies.value);
        });
        var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);
        db.transaction(function (tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS LOGS (id unique, log)');
            tx.executeSql('INSERT INTO LOGS (id, log) VALUES (1, "foobar")');
            tx.executeSql('INSERT INTO LOGS (id, log) VALUES (2, "logmsg")');
         });

         db.transaction(function (tx) {
            tx.executeSql('SELECT * FROM LOGS', [], function (tx, results) {
               var len = results.rows.length, i;
               for (i = 0; i < len; i++){
                  console.log(results.rows.item(i).log);
               }
            }, null);
         });
    });

});