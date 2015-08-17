(function() {
  var controllers;

  controllers = angular.module('todoApp.controllers', []);

  controllers.controller('taskListController', function($scope, $state, $log, $http, tasks, meetings) {
    $scope.tasks = tasks.all;
    $scope.meetings = meetings.all;
    $scope.remove = function(task) {
      var index;
      index = $scope.tasks.indexOf(task);
      $scope.tasks.splice(index, 1);
      return $log.info("Completed Task Removed");
    };
    $scope.add_task = function() {
      var data, date, int_date,
        _this = this;
      date = new Date($scope.$parent.due_date);
      int_date = new Date().getTime();
      data = {
        'task': $scope.$parent.task,
        'priority': 0,
        'due_date': date,
        'completed': false,
        'owner_id': '1'
      };
      $scope.$parent.due_date = "";
      $scope.$parent.task = "";
      return $http({
        method: 'POST',
        url: '/todo/tasks/' + int_date + '/',
        data: data
      }).success(function(data) {
        return $log.info("Added Task");
      }).error(function(data) {
        return $log.info("Failed to add Task");
      });
    };
    return $scope.add_meeting = function() {
      var data, date, int_date,
        _this = this;
      date = new Date($scope.$parent.date);
      int_date = new Date().getTime();
      data = {
        'meeting': $scope.$parent.meeting,
        'date': date
      };
      $scope.$parent.date = "";
      $scope.$parent.meeting = "";
      return $http({
        method: 'POST',
        url: '/todo/meetings/' + int_date + '/',
        data: data
      }).success(function(data) {
        return $log.info("Added Meeting");
      }).error(function(data) {
        return $log.info("Failed to add Meeting");
      });
    };
  });

  controllers.controller('taskDetailController', function($scope, $state, $log, task) {
    return $scope.task = task;
  });

  controllers.controller('meetingDetailController', function($scope, $state, $log, meeting) {
    return $scope.meeting = meeting;
  });

  controllers.controller('meetingListController', function($scope, $state, $log, meetings) {
    return $scope.meetings = meetings.all;
  });

}).call(this);
