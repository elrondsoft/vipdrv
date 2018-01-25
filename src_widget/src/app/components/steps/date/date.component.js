(function () {
    angular.module('myApp')
        .component('tdDate', {
            controller: function ($scope, $window, $interval, dealerData, bookingData) {

                // =======================================================================//
                // Variables                                                              //
                // =======================================================================//

                var self = this;
                self.isLoading = true;
                self.isStepValid = false;
                self.dealerData = dealerData;
                self.bookingData = bookingData;
                self.minimumSelectableDate = null;
                self.timeIntervals = [];
                self.dateImput = null;
                self.mobileDateTimeInput = null;
                self.workingHoursByDayOfWeek = null;
                self.isDateSelectableDesctop = null;
                self.isDateSelectableMobile = null;
                self.preveoursTime = null;
                self.loadingCheckerInterval = null;
                self.minimumAvaliableDate = null;
                self.firstInit = true;

                // =======================================================================//
                // Init                                                                   //
                // =======================================================================//

                self.$onInit = function () {
                    // #warning: CSS hack
                    var div = $window.document.getElementsByClassName('test-drive-widget__root')[0];
                    if (div) {
                        div.style.display = 'table';
                    }

                    if (self.dealerData.siteId != null) {
                        self.isLoading = false;
                        self.initStep();
                    } else {
                        self.isLoading = true;
                        self.loadingCheckerInterval = $interval(function () {
                            if (self.dealerData.siteId != null) {
                                self.isLoading = false;
                                self.stopInterval();
                                self.initStep();
                            }
                        }, 100);
                    }
                };

                self.stopInterval = function () {
                    if (angular.isDefined(self.loadingCheckerInterval)) {
                        $interval.cancel(self.loadingCheckerInterval);
                        self.loadingCheckerInterval = undefined;
                    }
                };

                // =======================================================================//
                // Step Logic                                                             //
                // =======================================================================//

                self.getMinimumAvaliableDate = function (workingHoursByDayOfWeek, dayOfWeek, counter) {
                    if (dayOfWeek > 6) {
                        dayOfWeek = 0;
                    }

                    if (counter > 6) {
                        return null;
                    }

                    var dayOfWeekData = workingHoursByDayOfWeek[dayOfWeek];
                    var startTime = dayOfWeekData.startTime.split(':')[0];
                    var endTime = dayOfWeekData.endTime.split(':')[0];
                    var currentDate = moment();
                    var currentHour = currentDate.hour();

                    if (dayOfWeekData.isActive && counter > 0) {
                        currentDate.startOf('day');
                        currentDate.add(counter, 'days');
                        return currentDate;
                    }

                    if (dayOfWeekData.isActive && currentHour > startTime && currentHour < endTime - 1 && counter == 0) {
                        currentDate.startOf('day');
                        currentDate.add(counter, 'days');
                        return currentDate;
                    }

                    return self.getMinimumAvaliableDate(workingHoursByDayOfWeek, ++dayOfWeek, ++counter);
                };

                self.initStep = function () {
                    self.workingHoursByDayOfWeek = self.groupWorkingHoursByDayOfWeek(self.dealerData.workingHours);
                    self.minimumAvaliableDate = self.getMinimumAvaliableDate(self.workingHoursByDayOfWeek, new Date().getDay(), 0);

                    if (self.bookingData.calendar.date) {
                        self.dateImput = self.bookingData.calendar.date;
                        self.mobileDateTimeInput = self.bookingData.calendar.date;
                    } else {
                        self.dateImput = self.minimumAvaliableDate;
                        // self.mobileDateTimeInput = self.minimumAvaliableDate;
                    }
                    self.validateStep();

                    var startTime = self.workingHoursByDayOfWeek[self.minimumAvaliableDate.day()].startTime;
                    var endTime = self.workingHoursByDayOfWeek[self.minimumAvaliableDate.day()].endTime;

                    var isToday = false;
                    if (self.minimumAvaliableDate.day() == new Date().getDay()) {
                        isToday = true;
                    }

                    self.timeIntervals = self.splitTimeToInvervals(startTime, endTime, isToday);

                    self.isDateSelectableDesctop = function (date, type) {
                        var dayOfWeek = date.format('d');
                        return self.workingHoursByDayOfWeek[dayOfWeek].isActive;
                    };

                    self.isDateSelectableMobile = function (date, type) {
                        var selectedDayOfWeek = date.format('d');
                        var isDayAvalibale = self.workingHoursByDayOfWeek[selectedDayOfWeek].isActive;

                        var isTimeAvalibale = false;
                        var selectedHour = date.hour();
                        var selectedDay = date.date();
                        var selectedMonth = date.month();

                        var currentDate = new Date();
                        var currentDay = currentDate.getDate();
                        var currentMonth = currentDate.getMonth();

                        var startTime = self.workingHoursByDayOfWeek[selectedDayOfWeek].startTime.split(':')[0];
                        var endTime = self.workingHoursByDayOfWeek[selectedDayOfWeek].endTime.split(':')[0];

                        if (selectedDay == currentDay && selectedMonth == currentMonth) {
                            if (selectedHour != 12 || (selectedHour == 12 && self.preveoursTime == 11)) {
                                startTime = moment().hours() + 1;
                            }
                        }
                        self.preveoursTime = selectedHour;

                        if (startTime <= selectedHour && selectedHour <= endTime) {
                            isTimeAvalibale = true;
                        }

                        return isDayAvalibale && isTimeAvalibale;
                    };
                };

                self.groupWorkingHoursByDayOfWeek = function (siteWorkingHours) {
                    var defaultWorkingHours = {
                        0: {startTime: '09:00:00', endTime: '18:00:00', isActive: false},
                        1: {startTime: '09:00:00', endTime: '18:00:00', isActive: false},
                        2: {startTime: '09:00:00', endTime: '18:00:00', isActive: false},
                        3: {startTime: '09:00:00', endTime: '18:00:00', isActive: false},
                        4: {startTime: '09:00:00', endTime: '18:00:00', isActive: false},
                        5: {startTime: '09:00:00', endTime: '18:00:00', isActive: false},
                        6: {startTime: '09:00:00', endTime: '18:00:00', isActive: false}
                    };

                    for (var key in siteWorkingHours) {
                        var day = siteWorkingHours[key];
                        defaultWorkingHours[day.dayOfWeek].isActive = true;
                        defaultWorkingHours[day.dayOfWeek].startTime = day.startTime;
                        defaultWorkingHours[day.dayOfWeek].endTime = day.endTime;
                    }

                    return defaultWorkingHours;
                };

                self.desctopDateChanged = function (oldValue, newValue) {
                    var arr = newValue._i.split(' ');
                    var dayOfWeek = arr[1];

                    self.bookingData.calendar.time = cleanTimeIfInvalid(self.bookingData.calendar.time, dayOfWeek);
                    self.bookingData.calendar.date = arr[0];
                    self.bookingData.calendar.dayOfWeek = dayOfWeek;
                    self.validateStep();

                    var startTime = self.workingHoursByDayOfWeek[dayOfWeek].startTime;
                    var endTime = self.workingHoursByDayOfWeek[dayOfWeek].endTime;

                    var isToday = false;
                    if (new Date().getDate() == newValue.date()) {
                        isToday = true;
                    }
                    self.timeIntervals = self.splitTimeToInvervals(startTime, endTime, isToday);
                };

                self.mobileDateChanged = function (oldValue, newValue) {
                    var arr = newValue._i.split(' ');

                    var date = arr[0];
                    var hours = arr[1].split(' ')[0].split(':')[0];
                    var amPm = arr[2];
                    var dayOfWeek = arr[3];

                    self.bookingData.calendar.date = date;
                    self.bookingData.calendar.time = hours + ':' + '00 ' + amPm;
                    self.bookingData.calendar.dayOfWeek = dayOfWeek;
                    self.bookingData.calendar.isSkipped = false;
                    self.validateStep();
                };

                self.timeChanged = function (time, isActive) {
                    if (!isActive) {
                        return;
                    }
                    self.bookingData.calendar.time = time;
                    self.bookingData.calendar.isSkipped = false;
                    self.validateStep();
                };

                self.validateStep = function () {
                    if (self.bookingData.calendar.date != null && self.bookingData.calendar.time != null) {
                        self.isStepValid = true;
                    } else {
                        self.isStepValid = false;
                    }
                };

                function cleanTimeIfInvalid(selectedTime, dayOfWeek) {
                    if (!selectedTime) {
                        return selectedTime;
                    }

                    var selectedHour = moment(selectedTime, 'HH:mm A').get('hour');
                    var startTime = parseInt(self.workingHoursByDayOfWeek[dayOfWeek].startTime.split(':')[0]);
                    var endTime = parseInt(self.workingHoursByDayOfWeek[dayOfWeek].endTime.split(':')[0]);

                    if (!(startTime <= selectedHour && selectedHour <= endTime)) {
                        return null;
                    }
                    return selectedTime;
                }

                // =======================================================================//
                // Navigation                                                             //
                // =======================================================================//

                $scope.nextStep = function () {
                    if (self.isStepValid) {
                        self.completeStep({tabId: self.tabId});
                    }
                };

                $scope.skipStep = function () {
                    self.bookingData.calendar.isSkipped = true;
                    self.completeStep({tabId: self.tabId});
                };

                // =======================================================================//
                // Helpers                                                                //
                // =======================================================================//

                self.splitTimeToInvervals = function (startTime, endTime, isToday) {
                    // round minutes
                    var hours = startTime.split(':')[0];
                    var minutes = startTime.split(':')[1];
                    if (parseInt(minutes) > 0) {
                        hours++;
                        startTime = hours + ':00:00';
                    }

                    var currentHours = moment().hours() + 1;
                    var start = moment('2000-01-01 ' + startTime);
                    var end = moment('2000-01-01 ' + endTime);
                    var timeIntervalsArr = [];

                    while (start <= end) {
                        var startHours = start.hours();

                        var item = {
                            time: start.format('LT'),
                            isActive: true
                        };

                        if (currentHours > startHours && isToday) {
                            item.isActive = false;
                        }

                        timeIntervalsArr.push(item);
                        start.add(1, 'hours');
                    }

                    return timeIntervalsArr;
                };

            },
            templateUrl: 'src/app/components/steps/date/date.tpl.html',
            bindings: {
                tabId: '<',
                completeStep: '&'
            }
        });
})();

