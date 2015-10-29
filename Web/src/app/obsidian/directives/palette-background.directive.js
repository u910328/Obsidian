(function() {
    'use strict';

    angular
        .module('obsidian.directives')
        .directive('paletteBackground', paletteBackground);

    /* @ngInject */
    function paletteBackground(obTheming) {
        // Usage:
        // ```html
        // <div palette-background="green:500">Coloured content</div>
        // ```
        //
        // Creates:
        //
        var directive = {
            bindToController: true,
            link: link,
            restrict: 'A'
        };
        return directive;

        function link($scope, $element, attrs) {
            var splitColor = attrs.paletteBackground.split(':');
            var color = obTheming.getPaletteColor(splitColor[0], splitColor[1]);

            if(angular.isDefined(color)) {
                $element.css({
                    'background-color': obTheming.rgba(color.value),
                    'border-color': obTheming.rgba(color.value),
                    'color': obTheming.rgba(color.contrast)
                });
            }
        }
    }
})();
