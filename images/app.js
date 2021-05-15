var app = angular.module("myApp", ["ngRoute"]);

app.config(function ($routeProvider) {
  $routeProvider

    .when("/", {
      templateUrl: "pages/home.html",
      controller: "HomeController",
    })

    .when("/blog", {
      templateUrl: "pages/blog.html",
      controller: "BlogController",
    })

    .when("/about", {
      templateUrl: "pages/about.html",
      controller: "AboutController",
    })

    .otherwise({ redirectTo: "/" });
});

app.controller("HomeController", function ($scope) {
  $scope.message = "Welcome to Home Page";
});

app.controller("BlogController", function ($scope) {
  $scope.message = "Welcome to Blog Page";
});

app.controller("AboutController", function ($scope) {
  $scope.message = "Welcome to About Page";
});
