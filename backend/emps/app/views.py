from django.shortcuts import render,get_object_or_404
from django.http import JsonResponse,HttpResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import emp

@csrf_exempt
def getEmps(request):
    if request.method == 'GET':
        x = emp.objects.all()
        xList = [{'id':y.id, 'name':y.name, 'job':y.job, 'years':str(y.years), 'date':y.date} for y in x]
        return JsonResponse(xList,safe=False)


@csrf_exempt
def addEmps(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        x = emp.objects.create(name=data['name'], job=data['job'], years=data['years'])
        xList = {'id':x.id,'name':x.name,'job':x.job,'years':str(x.years), 'date':x.date}
        return JsonResponse(xList)
    
@csrf_exempt
def deleteEmps(request, x):
    d = get_object_or_404(emp, id = x)
    if request.method == 'DELETE':
        d.delete()
        return HttpResponse(status=204)
    
@csrf_exempt
def updateEmps(request, x):
    if request.method== 'PUT':
        data = json.loads(request.body)
        try:
            x = emp.objects.get(id=x)
            x.name = data['name']
            x.job = data['job']
            x.years = data['years']
            x.save()
            updatedEmps = {'id':x.id,'name':x.name,'job':x.job,'years':x.years}
            return JsonResponse(updatedEmps)
        except emp.DoesNotExist:
            return JsonResponse({'error': 'Employee not found'}, status=404)

