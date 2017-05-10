from django.conf.urls import url
from geopolls.views import SubmissionCreate

urlpatterns = [
    # ...
    url(r'submission/add/$', SubmissionCreate, name='submission-add'),
    # url(r'author/(?P<pk>[0-9]+)/$', AuthorUpdate.as_view(), name='author-update'),
    # url(r'author/(?P<pk>[0-9]+)/delete/$', AuthorDelete.as_view(), name='author-delete'),
]
# url(r'^(?P<question_id>[0-9]+)/vote/$', views.vote, name='vote'),
