(function () {
    angular.module('myApp')
        .component('tdBeverage', {
            controller: function ($scope) {
                var self = this;

                self.isStepValid = null;

                self.$onInit = function () {
                    if (self.userData.beverage.name === null) {
                        self.isStepValid = false;
                    }
                };

                $scope.itemChanged = function (id, name) {
                    self.userData.beverage.id = id;
                    self.userData.beverage.name = name;
                    self.validateStep();
                };

                this.validateStep = function () {
                    if (self.userData.beverage.name === null) {
                        self.isStepValid = false;
                    } else {
                        self.isStepValid = true;
                    }
                };

                $scope.nextStepInner = function () {
                    self.validateStep();
                    if (self.isStepValid) {
                        self.completeStep({tabId: self.tabId});
                    }
                };
            },
            templateUrl: 'src/app/components/steps/beverage/beverage.tpl.html',
            bindings: {
                userData: '=',
                stepData: '<',
                tabId: '<',
                completeStep: '&'
            }
        });
})();

