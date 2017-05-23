from django.shortcuts import render
from django.http import HttpResponse
from django.core.serializers import serialize
from .models import Submission
# from users.models import User
from django.db import IntegrityError, transaction
from django.views.generic.edit import CreateView, UpdateView, DeleteView

class AjaxableResponseMixin(object):
    "mixin for ajax, since client is seperate(at least for now)"

    def form_invalid(self, form):
        response = super(AjaxableResponseMixin, self).form_invalid(form)
        if self.request.is_ajax():
            return JsonResponse(form.errors, status=400)
        else:
            return response

    def form_valid(self, form):
        # We make sure to call the parent's form_valid() method because
        # it might do some processing (in the case of CreateView, it will
        # call form.save() for example).
        response = super(AjaxableResponseMixin, self).form_valid(form)
        if self.request.is_ajax():
            data = {
                'pk': self.object.pk,
            }
            return JsonResponse(data)
        else:
            return response

class SubmissionCreate(AjaxableResponseMixin, CreateView):
    model = Submission
    fields = ['user_id', 'description', 'geom', 'org', 'email']


def post_entry(request):
    '''Process incoming json string
    '''
    if request.method == 'POST':

        post_data = request.body

    # Return a response
    return HttpResponse('data received OK')
#
#
# def submit(request):
#     submission = get_object_or_404(Submission, pk=submission_id)
#     try:
#         data = submission.choice_set.get(pk=request.POST)
