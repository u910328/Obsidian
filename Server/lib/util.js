var q = require('q'),
    _ = require('lodash');

function getPromises(promiseList, localPromises, globalPromises) {
    var promises = {};
    _.forEach(promiseList, function (n) {
        var promiseName = promiseList[n];
        if (typeof promiseName === 'string') promises[promiseName] = localPromises[promiseName] || globalPromises[promiseName]
    });
    if(Object.keys(promises).length===0) {var def= q.defer(); def.resolve();}
    return q.all(promises)
}

module.exports = {
    getPromises: getPromises
};