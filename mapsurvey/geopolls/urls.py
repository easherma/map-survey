from django.conf.urls import url
from geopolls.views import SubmissionCreate, submission_new
from djgeojson.views import GeoJSONLayerView
from .models import Submission
from . import views
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    url(r'^submissions/new/$', views.submission_new, name='submission_new'),
    url(r'^data.geojson$', GeoJSONLayerView.as_view(model=Submission), name='data'),
    url(r'^submissions/$', TemplateView.as_view(template_name="geopolls/submissions.html"), name='submissions'),
    # ...
    # url(r'submission/add/$', SubmissionCreate, name='submission-add'),
    # url(r'^submission/data/$', GeoJSONLayerView.as_view(model=Submission), name='data')
    # url(r'author/(?P<pk>[0-9]+)/$', AuthorUpdate.as_view(), name='author-update'),
    # url(r'author/(?P<pk>[0-9]+)/delete/$', AuthorDelete.as_view(), name='author-delete'),
]
