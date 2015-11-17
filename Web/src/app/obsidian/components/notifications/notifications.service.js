(function () {
    'use strict';

    angular
        .module('obsidian.components')
        .factory('obNotificationsService', NotificationsService);

    /* @ngInject */
    function NotificationsService(Auth, $firebase) {
        var notifications = {},
            ref,
            callback;
        Auth.$onAuth(function (user) {
            if (!user) return;
            if (ref && callback) {
                ref.off('value', callback)
            }
            ref = $firebase.ref('users/' + user.uid + '/notifications');
            callback = function (snap) {
                notifications = snap.val();
            };

            ref.on('value', callback);
        });

        function getNotification() {
            return notifications;
        }

        function addNotification(groupName, notification) {
            if (ref && callback) ref.child(groupName).push(notification);
        }

        function getSubTotal() {
            var total = 0;
            angular.forEach(notifications, function (group) {
                angular.forEach(group, function () {
                    total += 1
                })
            });
            return total;
        }

        return {
            getNotification: getNotification,
            addNotification: addNotification,
            getSubTotal: getSubTotal
        }
    }
})();
