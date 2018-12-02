from tastypie import fields
from tastypie.resources import ModelResource
from tastypie.authorization import Authorization
from tastypie.utils import trailing_slash
from django.conf.urls import url
from evently.models import Event, Location


class LocationsResource(ModelResource):
    class Meta:
        queryset = Location.objects.all()
        resource_name = 'locations'
        authorization = Authorization()


class EventsResource(ModelResource):
    registered = fields.BooleanField()
    location = fields.ForeignKey(LocationsResource, 'location')
    short_location = fields.CharField()

    class Meta:
        queryset = Event.objects.all()
        resource_name = 'events'
        authorization = Authorization()

    def dehydrate_registered(self, bundle):
        return bundle.obj.user_registered()

    def dehydrate_short_location(self, bundle):
        return f'{bundle.obj.location.city}, {bundle.obj.location.state}'

    def prepend_urls(self):
        return [
            url(r"^(?P<resource_name>%s)/(?P<pk>\w[\w/-]*)/register%s$" %
                (self._meta.resource_name, trailing_slash()),
                self.wrap_view('register'), name="api_event_register"),
        ]

    def register(self, request, **kwargs):
        self.method_check(request, allowed=['post', 'delete'])
        request_bundle = self.build_bundle(request=request)
        event = self.cached_obj_get(
            bundle=request_bundle, **self.remove_api_resource_names(kwargs))
        if request.method == 'POST':
            return self.create_response(request, event.register())
        elif request.method == 'DELETE':
            return self.create_response(request, event.unregister())
