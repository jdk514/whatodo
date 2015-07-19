controllers = angular.module('todoApp.controllers', [])

#Rename Controller, no longer exclusive to Tasks
controllers.controller('taskListController', ($scope, $state, $log, $http, tasks, meetings) ->
	$scope.tasks = tasks.all
	# Included meetings in this controller to simply controllers/services
	$scope.meetings = meetings.all

	$scope.remove = (task) ->
		index = $scope.tasks.indexOf(task);
		$scope.tasks.splice(index, 1);
		$log.info("Completed Task Removed")
	
	# Logic to add new tasks
	$scope.add_task = ->
		date = new Date($scope.$parent.due_date)
		#Use the current time to set the id - should be unique
		int_date = new Date().getTime()
		data = {'task' : $scope.$parent.task, 'priority' : 0, 'due_date' : date, 'completed' : false, 'owner_id' : '1'}
		$scope.$parent.due_date = ""
		$scope.$parent.task = ""
		$http({method: 'POST', url: '/todo/tasks/' + int_date + '/', data:data})
		.success (data) =>
			$log.info("Added Task")
		.error (data) =>
			$log.info("Failed to add Task")

	# Logic to add new meetings
	$scope.add_meeting = ->
		date = new Date($scope.$parent.date)
		#Use the current time to set the id - should be unique
		int_date = new Date().getTime()
		data = {'meeting' : $scope.$parent.meeting, 'date' : date}
		$scope.$parent.date = ""
		$scope.$parent.meeting = ""
		$http({method: 'POST', url: '/todo/meetings/' + int_date + '/', data:data})
		.success (data) =>  
			$log.info("Added Meeting")
		.error (data) =>
			$log.info("Failed to add Meeting")

)

controllers.controller('taskDetailController', ($scope, $state, $log, task) ->
	$scope.task = task
)

controllers.controller('meetingDetailController', ($scope, $state, $log, meeting) ->
	$scope.meeting = meeting 
)

controllers.controller('meetingListController',  ($scope, $state, $log, meetings) ->
	$scope.meetings = meetings.all
)