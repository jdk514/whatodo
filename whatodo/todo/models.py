from django.db import models

class Task(models.Model):
	task = models.CharField(max_length=200)
	# Field created for future use
	priority = models.IntegerField(default=0)
	due_date = models.DateTimeField('date due')
	completed = models.BooleanField(default=False)
	owner = models.ForeignKey('auth.User', related_name='tasks')

	def __unicode__(self):
		return self.task


class Meeting(models.Model):
	meeting = models.CharField(max_length=200)
	date = models.DateTimeField('date')

	def __unicode__(self): 
		return self.meeting



