(function () {
    angular.module('myApp')
        .component('root', {
            controller: function ($scope, $window, globalState, bookingData, dealerData, widgetTabs, siteId, api) {

                var self = this;
                self.siteId = siteId;
                self.bookingData = bookingData;
                self.dealerData = dealerData;
                self.widgetTabs = widgetTabs;
                self.globalState = globalState;

                // =======================================================================//
                // Wizard                                                                 //
                // =======================================================================//

                self.switchTab = function (tabId) {
                    if (self.widgetTabs[tabId].isActive) {
                        return;
                    }

                    if (self.widgetTabs[tabId].isLocked) {
                        return;
                    }

                    for (var key in self.widgetTabs) {
                        self.widgetTabs[key].isActive = false;
                    }

                    for (var key in self.widgetTabs) {
                        self.widgetTabs[key].isActive = false;
                    }
                    self.widgetTabs[tabId].isActive = true;
                };

                // =======================================================================//
                // Init                                                                   //
                // =======================================================================//

                self.$onInit = function () {
                    parseWidgetParams();

                    api.retrieveSite().then(function (data) {
                        self.dealerData.siteId = data.id;
                        self.dealerData.name = data.dealerName;
                        self.dealerData.phone = data.dealerPhone;
                        self.dealerData.address = data.dealerAddress;
                        self.dealerData.siteUrl = data.url;
                        self.dealerData.workingHours = data.workingHours;
                    });
                    api.retrieveExperts().then(function (data) {
                        self.dealerData.experts.items = data.items;
                    });
                    api.retrieveBeverages().then(function (data) {
                        self.dealerData.beverages.items = data.items;
                    });
                    api.retrieveRoutes().then(function (data) {
                        self.dealerData.roads.items = data.items;
                    });
                };

                // =======================================================================//
                // Helpers                                                                //
                // =======================================================================//

                function parseWidgetParams() {
                    var url = new FiltersFromUrl($window.location.search).get();

                    self.bookingData.vehicle.vin = url.vin || null;
                    self.bookingData.vehicle.stock = url.stock || null;
                    self.bookingData.vehicle.year = url.year || null;
                    self.bookingData.vehicle.make = url.make || null;
                    self.bookingData.vehicle.model = url.model || null;
                    self.bookingData.vehicle.body = url.body || null;
                    self.bookingData.vehicle.title = url.title || null;
                    self.bookingData.vehicle.engine = url.engine || null;
                    self.bookingData.vehicle.exterior = url.exterior || null;
                    self.bookingData.vehicle.drivetrain = url.drivetrain || null;
                    self.bookingData.vehicle.transmission = url.transmission || null;
                    self.bookingData.vehicle.msrp = url.msrp || null;
                    self.bookingData.vehicle.imageUrl = url.imageUrl || null;
                    self.bookingData.vehicle.vdpUrl = url.vdpUrl || null;
                }
            },
            templateUrl: 'src/app/components/root.tpl.html'
        });

    angular.module('myApp')
        .filter('usaDateFormat', function () {
            return function (dateStr) {
                dateStr = dateStr || '';
                var chunks = dateStr.split("-");

                var out = chunks[1] + '/' + chunks[2] + '/' + chunks[0].slice(-2);

                return out;
            };
        });

    angular.module('myApp')
        .filter('vehicleTitleFormat', function () {
            return function (vehicleTitleStr) {
                if (!vehicleTitleStr) {
                    return 'Vehicle Title';
                }

                var arr = vehicleTitleStr.split(' ');
                if (arr.length < 3) {
                    return vehicleTitleStr;
                }

                return vehicleTitleStr.split(' ').splice(2).join(' ');

                // 'Pre-Owned 2011 Audi A5 2dr Cpe Auto quattro 2.0T Premium P AWD';
                // 0 - new|used
                // 1 - year
                // 2 - make
                // 3 - model ?
            };
        });
})();

