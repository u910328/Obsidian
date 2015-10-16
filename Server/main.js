var init = require('./lib/init'),
    auth = require('./lib/auth'),
    regServer = require('./lib/regServer'),
    loadSetup = require('./lib/loadSetup'),
    watch = require('./lib/watch');

init() //檢查config是否正確
    .then(auth)
    .then(regServer)
    .then(loadSetup)
    .then(watch);



