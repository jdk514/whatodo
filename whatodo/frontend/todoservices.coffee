services = angular.module('todoApp.services', [])

services.factory('Task', ($http, $log) ->
    class Task
        constructor : (data) ->
            if data != null
                @init(data)
        init : (data) ->
            forceTwoDigits = (val) ->
                if val < 10
                    return "0#{val}"
                return val

            today = new Date()
            new_date = new Date(data.due_date)
            real_month = new_date.getMonth() + 1
            @datetime = data.due_date
            @task = data.task
            @id = data.id
            @completed = !data.completed
            @due_date = new_date.getDate() + '/' + real_month + '/' + new_date.getFullYear() + ' at ' + forceTwoDigits(new_date.getHours()) + ':' + forceTwoDigits(new_date.getMinutes())
            @priority = data.priority
            if today > new_date 
                @overdue = "alert alert-danger"
            else
                @overdue = ""

        get : (taskId) ->
            $http({method: 'GET', url: '/todo/tasks/' + taskId + '/'})
            .success (data) =>
                @init(data)
                $log.info("Succesfully fetched task")
            .error (data) =>
                $log.info("Failed to fetch task.")

        # Simple logic to update a task to completed
        complete : ->
            data = {'task' : @task, 'priority' : @priority, 'due_date' : @datetime, 'completed' : true}
            $http({method: 'PUT', url: '/todo/tasks/' + @id + '/', data:data})
            .success (data) =>  
                $log.info("Task Completed")
            .error (data) =>
                $log.info("Failed to Complete")

    return Task
)

services.factory('Tasks', ($log, $http, Task) ->
    tasks = {
        all : []
    }

    fromServer: (data) ->
        tasks['all'].length = 0
        for task in data
            tasks['all'].push(new Task(task))

    fetch: ->
        $http({method: 'GET', url: '/todo/tasks'})
            .success (data) =>
                @fromServer(data)
                $log.info("Succesfully fetched tasks.")
            .error (data) =>
                $log.info("Failed to fetch tasks.")

    data : ->
        return tasks
)

services.factory('Meeting', ($http, $log) ->
    class Meeting
        constructor : (data) ->
            if data != null
                @init(data)
        init : (data) ->
            forceTwoDigits = (val) ->
                if val < 10
                    return "0#{val}"
                return val

            new_date = new Date(data.date)
            new_date.setMonth(new_date.getMonth() + 1)
            @meeting = data.meeting
            @id = data.id
            @date = new_date.getDate() + '/' + new_date.getMonth() + '/' + new_date.getFullYear() + ' at ' + forceTwoDigits(new_date.getHours()) + ':' + forceTwoDigits(new_date.getMinutes())

        get : (meetingId) ->
            $http({method: 'GET', url: '/todo/meetings/' + meetingId + '/'})
            .success (data) =>
                @init(data)
                $log.info("Succesfully fetched meeting")
            .error (data) =>
                $log.info("Failed to fetch meeting.")

        complete : ->
            data = {'meeting' : @meeting, 'due_date' : @date}
            $http({method: 'PUT', url: '/todo/meetings/' + @id + '/', data:data})
            .success (data) =>  
                $log.info("Meeting Completed")
            .error (data) =>
                $log.info("Failed to Complete")

    return Meeting
)

services.factory('Meetings', ($log, $http, Meeting) ->
    meetings = {
        all : []
    }

    fromServer: (data) ->
        meetings['all'].length = 0
        for meeting in data 
            meetings['all'].push(new Meeting(meeting))

    fetch: ->
        forceTwoDigits = (val) ->
            if val < 10
                return "0#{val}"
            return val
        today = new Date();
        dd = forceTwoDigits(today.getDate());
        mm = forceTwoDigits(today.getMonth()+1); #January is 0!
        yyyy = today.getFullYear();
        base_url = '/todo/meetings/' + yyyy + '/' + mm + '/' + dd + '/';
        #get_url = base.concat(yyyy, '/', mm, '/', dd, '/')
        $http({method: 'GET', url: base_url})
            .success (data) =>
                @fromServer(data)
                $log.info("Succesfully fetched meetings for range.")
            .error (data) =>
                $log.info(base_url)
                $log.info("Failed to fetch meetings for range.")

    data : ->
        return meetings
)
