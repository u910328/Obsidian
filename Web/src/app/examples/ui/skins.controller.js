(function() {
    'use strict';

    angular
        .module('app.examples.ui')
        .controller('SkinsUIController', SkinsUIController);

    /* @ngInject */
    function SkinsUIController($cookies, $window, obSkins, obTheming) {
        var vm = this;
        vm.elementColors = {
            logo: '',
            sidebar: '',
            content: '',
            toolbar: ''
        };
        vm.skins = obSkins.getSkins();
        vm.selectedSkin = obSkins.getCurrent();
        vm.trySkin = trySkin;
        vm.updatePreview = updatePreview;

        //////////////////////

        function trySkin() {
            if(vm.selectedSkin !== obSkins.getCurrent()) {
                $cookies.put('obsidian-skin',angular.toJson({
                    skin: vm.selectedSkin.id
                }));
                $window.location.reload();
            }
        }


        function updatePreview() {
            for(var element in vm.elementColors) {
                var theme = obTheming.getTheme(vm.selectedSkin.elements[element]);
                var hue = angular.isUndefined(theme.colors.primary.hues.default) ? '500' : theme.colors.primary.hues.default;
                var color = obTheming.getPaletteColor(theme.colors.primary.name, hue);
                vm.elementColors[element] = obTheming.rgba(color.value);
            }
        }

        // init

        updatePreview();
    }
})();