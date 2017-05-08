from django.conf.urls import url
# from geopolls.views import points_view
from djgeojson.views import GeoJSONLayerView
from .models import Submission


urlpatterns = [
    # url(r'^points.data/', points_view, name='points'),
    url(r'^data.geojson$', GeoJSONLayerView.as_view(model=Submission), name='data'),
]

# urlpatterns = [
#     url(
#         regex=r'^(?P<map>[\w.@+-]+)/$',
#         view=views.points_view.as_view(),
#         name='points'
#     ),
#
# ]
