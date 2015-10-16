var util=require('./util'),
    watchList=require('./watchList'),
    _=require('lodash'),
    firebaseUtil=require('./firebaseUtil');

function handler(promise, callback){
    promise.then(callback);
}

function watch(watchList, globalPromises){
    _.forOwn(watchList, function (value,key) {
        var refUrl=value.refUrl||key,
            opt=value.options||{},
            ref = firebaseUtil.ref(refUrl, opt),
            handlers = value.handlers||{},
            def= q.defer(),
            promises={snapshot:def.promise};
        _.forOwn(handlers, function (value, name) {
            promises[name]=util.getPromises(value.resolve, promises, globalPromises||{})
                .then(value.handler);
        });

        ref.on('child_added', function (snap) {
            def.resolve(snap)
        }, function (error) {
            def.reject(error)
        })
    })
}