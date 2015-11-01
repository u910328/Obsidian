(function() {
    'use strict';

    angular
        .module('obsidian.components')
        .directive('obWizardForm', WizardFormProgress);

    /* @ngInject */
    function WizardFormProgress() {
        // Usage:
        //  <div ob-wizard>
        //      <form ob-wizard-form>
        //      </form>
        //  </div>
        //
        var directive = {
            require: ['form', '^obWizard'],
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs, require) {
            var ngFormCtrl = require[0];
            var obWizardCtrl = require[1];

            // register this form with the parent obWizard directive
            obWizardCtrl.registerForm(ngFormCtrl);

            // watch for form input changes and update the wizard progress
            element.on('input', function() {
                obWizardCtrl.updateProgress();
            });
        }
    }
})();