"""
Django settings for dddemo project.

For more information on this file, see
https://docs.djangoproject.com/en/1.6/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.6/ref/settings/
"""

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
from unipath import Path
import os
BASE_DIR = os.path.dirname(os.path.dirname(__file__))
PROJECT_DIR = Path(__file__).ancestor(3)
APP_DIR = Path(__file__).ancestor(2)


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.6/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'q%1_7^r9@jzu**v2g0fb66yr&zch9)6h%&*y(gm3c97nnyv76j'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

TEMPLATE_DEBUG = True

ALLOWED_HOSTS = []
 
# Application definition

INSTALLED_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'polls',
    'rest_framework',
    'todo',
    'user'
)

MIDDLEWARE_CLASSES = (
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
)

ROOT_URLCONF = 'config.urls'

WSGI_APPLICATION = 'config.wsgi.application'

LOGIN_URL = 'django.contrib.auth.views.login'
LOGIN_REDIRECT_URL = '/todo'


# Database
# https://docs.djangoproject.com/en/1.6/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

TEMPLATE_DIRS = (
    PROJECT_DIR.child("whatodo").child('templates'),
)

# Internationalization
# https://docs.djangoproject.com/en/1.6/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


BASE_DIR = os.path.dirname(os.path.abspath(__file__))
STATIC_ROOT = BASE_DIR + '/../staticfiles/'
#STATIC_ROOT = '/var/home/joel/Documents/whatodo/whatodo/static/'
STATIC_URL = '/static/'

STATICFILES_DIRS = (
    os.path.join(APP_DIR, 'static'),
)

# This segment necessary for Heroku deployment
import dj_database_url
import os
if os.getcwd() == "/app":
    DATABASES = {'default': dj_database_url.config(default='postgres://localhost')}
