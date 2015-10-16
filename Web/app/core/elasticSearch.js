//credit to katowulf: https://github.com/firebase/flashlight
(function () {
    obsidian.module('core.elasticSearch', [])
        .factory('elasticSearch', /*@ngInject*/ function (FBURL, Auth, $q, $rootScope) {
            function doSearch(scope, index, type, query) {
                scope = scope || $rootScope;
                var ref = new Firebase(FBURL + '/search');
                var key = ref.child('request').push({index: index, type: type, query: query}).key();
                console.log('search', key, {index: index, type: type, query: query});
                ref.child('response/' + key).on('value', showResults.bind(scope));
            }

            function showResults(snap) {
                if (snap.val() === null) {
                    return;
                } // wait until we get data
                var dat = snap.val();
//      console.log('result', snap.name(), snap.val());
                snap.ref().off('value', showResults);
                snap.ref().remove();
                this.result = dat;
                this.$digest();
            }

            function buildQuery(term, words) {
                // See this tut for more query options:
                // http://okfnlabs.org/blog/2013/07/01/elasticsearch-query-tutorial.html#match-all--find-everything
                return {
                    'query_string': {query: makeTerm(term, words)}
                };
            }

            function makeTerm(term, matchWholeWords) {
                if (!matchWholeWords) {
                    if (!term.match(/^\*/)) {
                        term = '*' + term;
                    }
                    if (!term.match(/\*$/)) {
                        term += '*';
                    }
                }
                return term;
            }

            return doSearch
        });
// display search results
})();
