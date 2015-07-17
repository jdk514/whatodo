
    var app = angular.module('gitIssues', []);

     app.config(function($interpolateProvider) {
        $interpolateProvider.startSymbol('[[');
        $interpolateProvider.endSymbol(']]');
    });
     
    app.controller("Issues", function ($scope, $http) {
        $scope.issues = [];
        $scope.labels = [];
        $scope.curr_label = "All";
     
        $scope.update_curr_label = function (label_name) {
            $scope.curr_label = label_name;
        }
     
        $scope.label_visible = function (issue_label) {
            if ($scope.curr_label === "All") {
                return true;
            } else if ($scope.curr_label === issue_label) {
                return true;
            }
            return false;
        }
     
        $http.get('https://api.github.com/repos/jdk514/whatodo/issues').
        success(function (data, status, headers, config) {
            for (var i = 0; i < data.length; i++) {
                $scope.issues.push(data[i]);
            }
        }).
        error(function (data, status, headers, config) {
            $scope.response = "Error";
            //error handling
        });
     
        $http.get('https://api.github.com/repos/jdk514/whatodo/labels').
        success(function (data, status, headers, config) {
            for (var i = 0; i < data.length; i++) {
                $scope.labels.push(data[i]);
            }
        }).
        error(function (data, status, headers, config) {
            $scope.response = "Error";
            //error handling
        });
    });