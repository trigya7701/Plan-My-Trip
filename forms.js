
(function() {

  var app = angular.module('form', ['ui.bootstrap']);

  app.controller('FormController', ['$http', '$scope', '$window',
    function($http, $scope, $window) {

      var type = this;
      type.meals = [];
      // Call the form data
      $http.get('form-meals.json').success(function(data) {
        type.meals = data;
      });

      $scope.booking = {};
      // watch for a change in the totalDays or groupSize
      $scope.$watchGroup(['booking.totalDays', 'booking.groupSize'], function(value) {
        total();
      });

      // send data to action.php on submit
      $scope.handleFormSubmit = function(booking) {


        $scope.booking = {};
        $scope.$parent.message = true;


      };


      this.selectMeal = function(setMeal) {
        if (!setMeal.active) {
          angular.forEach(this.meals, function(s) {
            s.active = false;
          });
          setMeal.active = true;
        }

        total();
      };

      var me = this;

      var total = function() {

        var total = 0;
        var percentage = 0;

        var discount = false;

        total = $scope.booking.totalDays * $scope.booking.groupSize;


        if ($scope.booking.totalDays >= 10) {
          percentage = (total / 100) * 10;
          total -= percentage;
          discount = true;
        }

        $scope.booking.total = total;
        $scope.booking.percentage = percentage;

        $scope.booking.discount = discount;
      };

      // Datepicker

      $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened1 = true;
        $scope.opened2 = false;
      };

      $scope.open2 = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened1 = false;
        $scope.opened2 = true;
      };

      $scope.clear = function() {
        $scope.dt = null;
        $scope.dt2 = null;
      };

      $scope.toggleMin = function() {
        $scope.minDate = $scope.minDate ? null : new Date();
      };
      $scope.toggleMin();

      $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
      };

      $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
      $scope.format = $scope.formats[0];

    }
  ]);

  app.controller('PanelController', function() {
    this.tab = 1;

    this.selectTab = function(setTab) {
      this.tab = setTab;
      if (setTab === 2) {
        $scope.message = false;
      }
    };

    this.isSelected = function(checkTab) {
      return this.tab == checkTab;

    };
  });
})();
