app = angular.module('todoApp', ['ui.router', 'todoApp.controllers',
		'todoApp.services'])

app.config(($interpolateProvider, $stateProvider, $urlRouterProvider) ->
    #Play nice with django's template
    $interpolateProvider.startSymbol('[[')
    $interpolateProvider.endSymbol(']]')
    #Default to question list
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('taskList'
            url: '/'
            templateUrl: 'taskList'
            controller: 'taskListController'
            resolve:
                tasks : (Tasks)->
                    Tasks.fetch()
                    return Tasks.data()
                meetings : (Meetings)->
                    Meetings.fetch()
                    return Meetings.data()
        )
        .state('taskDetail'
            url: '/{taskId:[0-9]+}/'
            templateUrl: 'taskDetail'
            controller: 'taskDetailController'
            resolve:
                task : ($stateParams, $log, Question)->
                    task = new Task(null)
                    task.get($stateParams.taskId)
                    return task
        )
        .state('meetingDetail'
            url: '/{meetingId:[0-9]+}/'
            templateUrl: 'meetingDetail'
            controller: 'meetingDetailController'
            resolve:
                meeting : ($stateParams, $log, Meeting)->
                    meeting = new Meeting(null)
                    meeting.get($stateParams.meetingId)
                    return meeting
        )        
#       .state('meetingList'
#           url: '/fsdaf'
#           templateUrl: 'meetingList'
#           controller: 'meetingListController'
#           resolve:
#               meetings : (Meetings)->
#                   Meetings.fetch()
#                   return Meetings.data()
#        )     
)

app.config(($httpProvider) ->
    getCookie = (name) ->
        for cookie in document.cookie.split ';' when cookie and name is (cookie.trim().split '=')[0]
            return decodeURIComponent cookie.trim()[(1 + name.length)...]
        null
    # Add Header to comply with Django's CSRF implementation
    $httpProvider.defaults.headers.common['X-CSRFToken'] = getCookie("csrftoken")
)
