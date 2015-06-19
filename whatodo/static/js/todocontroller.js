(function() {
  var controllers;

  controllers = angular.module('todoApp.controllers', []);

  controllers.controller('taskListController', function($scope, $state, $log, tasks) {
    return $scope.tasks = tasks.all;
  });

  controllers.controller('taskDetailController', function($scope, $state, $log, task) {
    return $scope.task = task;
  });

}).call(this);
