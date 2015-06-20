from rest_framework import serializers

from .models import Task, Meeting

class MeetingSerializer(serializers.ModelSerializer):

    class Meta:
        model = Meeting
        fields = ('meeting', 'id', 'date')

class TaskSerializer(serializers.ModelSerializer):

    class Meta:
        model = Task
        fields = ('task', 'priority', 'due_date', 'completed', 'id')

