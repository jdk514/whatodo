from rest_framework import generics, permissions
from .models import Task, Meeting
from .serializers import TaskSerializer, MeetingSerializer
from django.shortcuts import render
from datetime import datetime, timedelta
from django.contrib.auth.decorators import login_required

@login_required
def home(request):
  return HttpResponse('Home Page')



class TaskList(generics.ListCreateAPIView):
    model = Task
    serializer_class = TaskSerializer
    permission_classes = [
        permissions.AllowAny
    ]

    # Want Tasks ordered by the date they are due
    def get_queryset(self):
    	tasks = Task.objects.all().order_by('due_date')
    	return tasks

class TaskDateList(generics.ListCreateAPIView):
	model = Task
	serializer_class = TaskSerializer
	permission_classes = [
		permissions.AllowAny
	]

	# only want to get tasks on this day
	def get_queryset(self):
		year = self.kwargs.get("year")
		month = self.kwargs.get("month")
		day = self.kwargs.get("day")
		tasks = Task.objects.filter(due_date__day = day, due_date__month = month, due_date__year = year)
		return tasks

class TaskDetail(generics.CreateAPIView, generics.UpdateAPIView):
	model = Task
	serializer_class = TaskSerializer
	lookup_url_kwarg = 'task_pk'
	permission_classes = [
		permissions.AllowAny
	]

class MeetingDetail(generics.CreateAPIView):
	model = Meeting
	serializer_class = MeetingSerializer
	lookup_url_kwarg = 'meeting_pk'
	permission_classes = [
		permissions.AllowAny
	]

class MeetingList(generics.ListCreateAPIView):
	model = Meeting
	serializer_class = MeetingSerializer
	permission_classes = [
		permissions.AllowAny
	]

	#Only want to pull in the meetings within this week, and ordered
	def get_queryset(self):
		today = datetime.today()
		start_date = datetime(today.year, today.month, today.day, 23, 59, 59) - timedelta(days=1)
		end_date = datetime(today.year, today.month, today.day, 23, 59, 59) + timedelta(days=6)
		meetings = Meeting.objects.filter(date__range = [start_date, end_date]).order_by('date')
		return meetings

def index(request):
	# if request.user.is_authenticated():
	# 	return render(request, 'todo/index.html')
	# else:
	# 	redirect to login page
	return render(request, 'todo/index.html')
