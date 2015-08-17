(function() {
  var services;

  services = angular.module('todoApp.services', []);

  services.factory('Task', function($http, $log) {
    var Task;
    Task = (function() {
      function Task(data) {
        if (data !== null) {
          this.init(data);
        }
      }

      Task.prototype.init = function(data) {
        var forceTwoDigits, new_date, real_month, today;
        forceTwoDigits = function(val) {
          if (val < 10) {
            return "0" + val;
          }
          return val;
        };
        today = new Date();
        new_date = new Date(data.due_date);
        real_month = new_date.getMonth() + 1;
        this.datetime = data.due_date;
        this.task = data.task;
        this.id = data.id;
        this.completed = !data.completed;
        this.due_date = new_date.getDate() + '/' + real_month + '/' + new_date.getFullYear() + ' at ' + forceTwoDigits(new_date.getHours()) + ':' + forceTwoDigits(new_date.getMinutes());
        this.priority = data.priority;
        if (today > new_date) {
          return this.overdue = "alert alert-danger";
        } else {
          return this.overdue = "";
        }
      };

      Task.prototype.get = function(taskId) {
        var _this = this;
        return $http({
          method: 'GET',
          url: '/todo/tasks/' + taskId + '/'
        }).success(function(data) {
          _this.init(data);
          return $log.info("Succesfully fetched task");
        }).error(function(data) {
          return $log.info("Failed to fetch task.");
        });
      };

      Task.prototype.complete = function() {
        var data,
          _this = this;
        data = {
          'task': this.task,
          'priority': this.priority,
          'due_date': this.datetime,
          'completed': true,
          'owner': 'joel'
        };
        return $http({
          method: 'PUT',
          url: '/todo/tasks/' + this.id + '/',
          data: data
        }).success(function(data) {
          return $log.info("Task Completed");
        }).error(function(data) {
          return $log.info("Failed to Complete");
        });
      };

      return Task;

    })();
    return Task;
  });

  services.factory('Tasks', function($log, $http, Task) {
    var tasks;
    tasks = {
      all: []
    };
    return {
      fromServer: function(data) {
        var task, _i, _len, _results;
        tasks['all'].length = 0;
        _results = [];
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          task = data[_i];
          _results.push(tasks['all'].push(new Task(task)));
        }
        return _results;
      },
      fetch: function() {
        var _this = this;
        return $http({
          method: 'GET',
          url: '/todo/tasks'
        }).success(function(data) {
          _this.fromServer(data);
          return $log.info("Succesfully fetched tasks.");
        }).error(function(data) {
          return $log.info("Failed to fetch tasks.");
        });
      },
      data: function() {
        return tasks;
      }
    };
  });

  services.factory('Meeting', function($http, $log) {
    var Meeting;
    Meeting = (function() {
      function Meeting(data) {
        if (data !== null) {
          this.init(data);
        }
      }

      Meeting.prototype.init = function(data) {
        var forceTwoDigits, new_date;
        forceTwoDigits = function(val) {
          if (val < 10) {
            return "0" + val;
          }
          return val;
        };
        new_date = new Date(data.date);
        new_date.setMonth(new_date.getMonth() + 1);
        this.meeting = data.meeting;
        this.id = data.id;
        return this.date = new_date.getDate() + '/' + new_date.getMonth() + '/' + new_date.getFullYear() + ' at ' + forceTwoDigits(new_date.getHours()) + ':' + forceTwoDigits(new_date.getMinutes());
      };

      Meeting.prototype.get = function(meetingId) {
        var _this = this;
        return $http({
          method: 'GET',
          url: '/todo/meetings/' + meetingId + '/'
        }).success(function(data) {
          _this.init(data);
          return $log.info("Succesfully fetched meeting");
        }).error(function(data) {
          return $log.info("Failed to fetch meeting.");
        });
      };

      Meeting.prototype.complete = function() {
        var data,
          _this = this;
        data = {
          'meeting': this.meeting,
          'due_date': this.date
        };
        return $http({
          method: 'PUT',
          url: '/todo/meetings/' + this.id + '/',
          data: data
        }).success(function(data) {
          return $log.info("Meeting Completed");
        }).error(function(data) {
          return $log.info("Failed to Complete");
        });
      };

      return Meeting;

    })();
    return Meeting;
  });

  services.factory('Meetings', function($log, $http, Meeting) {
    var meetings;
    meetings = {
      all: []
    };
    return {
      fromServer: function(data) {
        var meeting, _i, _len, _results;
        meetings['all'].length = 0;
        _results = [];
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          meeting = data[_i];
          _results.push(meetings['all'].push(new Meeting(meeting)));
        }
        return _results;
      },
      fetch: function() {
        var base_url, dd, forceTwoDigits, mm, today, yyyy,
          _this = this;
        forceTwoDigits = function(val) {
          if (val < 10) {
            return "0" + val;
          }
          return val;
        };
        today = new Date();
        dd = forceTwoDigits(today.getDate());
        mm = forceTwoDigits(today.getMonth() + 1);
        yyyy = today.getFullYear();
        base_url = '/todo/meetings/' + yyyy + '/' + mm + '/' + dd + '/';
        return $http({
          method: 'GET',
          url: base_url
        }).success(function(data) {
          _this.fromServer(data);
          return $log.info("Succesfully fetched meetings for range.");
        }).error(function(data) {
          $log.info(base_url);
          return $log.info("Failed to fetch meetings for range.");
        });
      },
      data: function() {
        return meetings;
      }
    };
  });

}).call(this);
