from django.contrib import admin
from todo.models import Task, Meeting

# Admin models for Meetings and Tasks
class MeetingAdmin(admin.ModelAdmin):
	fieldsets = [
	(None, {'fields' : ['meeting']}),
	('Meeting Date', {'fields': ['date']}),
	]


class TaskAdmin(admin.ModelAdmin):
    fieldsets = [
        (None,               {'fields': ['task']}),
        ('Date information', {'fields': ['due_date']}),
        ('Priority (0 - lowest)', {'fields': ['priority']}),
        ('Completed', {'fields': ['completed']})
    ]

admin.site.register(Task, TaskAdmin)
admin.site.register(Meeting, MeetingAdmin)