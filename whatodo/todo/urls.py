from django.conf.urls import patterns, url, include

from .views import TaskList, MeetingList, TaskDetail, MeetingDetail, TaskDateList

urlpatterns = patterns('todo.views',
	url(r'^tasks$', TaskList.as_view(), name='tasks_list'),
	url(r'^tasks/(?P<year>\d{4})/(?P<month>\d{2})/(?P<day>\d{2})/$', TaskDateList.as_view(), name='tasks_date_list'),
	url(r'^tasks/(?P<task_pk>[0-9]+)/$', TaskDetail.as_view(), name="task_detail"),
	#url(r'^meetings$', MeetingList.as_view(), name='meetings_list'),
	url(r'^meetings/(?P<year>\d{4})/(?P<month>\d{2})/(?P<day>\d{2})/$', MeetingList.as_view(), name="meetings_list"), # URL for all Meetings on that date
	url(r'^meetings/(?P<meeting_pk>[0-9]+)/$', MeetingDetail.as_view(), name='meetings_detail'),
	url(r'^$', 'index', name='todo_index'),
)