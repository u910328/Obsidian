(function () {
    'use strict';

    angular
        .module('obsidian.components')
        .service('obNotificationsService', NotificationsService);

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

        return {
            getNotification: getNotification,
            addNotification: addNotification
        }
    }
})();
