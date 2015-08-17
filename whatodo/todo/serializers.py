from rest_framework import serializers
from django.contrib.auth.models import User

from .models import Task, Meeting

class MeetingSerializer(serializers.ModelSerializer):

	class Meta:
		model = Meeting
		fields = ('meeting', 'id', 'date')

class TaskSerializer(serializers.ModelSerializer):
	#Add in the owner field, the user who created and can edit the task
	owner = serializers.ReadOnlyField(source='owner.username')

	class Meta:
		model = Task
		fields = ('task', 'priority', 'due_date', 'completed', 'id', 'owner')

class UserSerializer(serializers.ModelSerializer):
	#Each user has a set of tasks associated with them
	tasks = serializers.PrimaryKeyRelatedField(many=True, queryset=Task.objects.all())
	# Start by testing tasks only
	#meetings = serializers.PrimaryKeyRelatedField(many=True, queryset=Meeting.objects.all())

	class Meta:
		model = User
		fields = ('id', 'username', 'tasks')