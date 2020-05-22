from django.shortcuts import render

from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Hospital, Paciente, Medico, Recurso
from .serializers import HospitalSerializer, PacienteSerializer, MedicoSerializer, RecursoSerializer

import requests

# Create your views here.
class HospitalViewSet(viewsets.ModelViewSet):

    queryset = Hospital.objects.all()
    serializer_class = HospitalSerializer


class PacienteViewSet(viewsets.ModelViewSet):

    queryset = Paciente.objects.all()
    serializer_class = PacienteSerializer

    @action(methods=('get', ), detail=False)
    def asintomaticos(self, *args, **kwargs):
        try:
            asintomaticos = self.queryset.filter(condicion='A')
            resp = []
            for paciente in asintomaticos:
                data = {
                    'id': paciente.id,
                    'nombre': paciente.nombre,
                    'apellido': paciente.apellido,
                }
                resp.append(data)
            return Response({
                'total': len(resp),
                'pacientes': resp
            })
        except Exception as e:
            return JsonResponse(
                data={'code': 500, 'message': str(e)}, status=500
            )


class MedicoViewSet(viewsets.ModelViewSet):

    queryset = Medico.objects.all()
    serializer_class = MedicoSerializer


class RecursoViewSet(viewsets.ModelViewSet):
    queryset = Recurso.objects.all()
    serializer_class = RecursoSerializer