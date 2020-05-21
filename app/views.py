from django.shortcuts import render

from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Paciente
from .serializers import PacienteSerializer

import requests

# Create your views here.
class PacienteViewSet(viewsets.ModelViewSet):

    queryset = Paciente.objects.all()
    serializer_class = PacienteSerializer

    @action(methods=('get', ), detail=False)
    def asintomaticos(self, *args, **kwargs):
        try:
            asintomaticos = self.queryset.filter(asintomatico=True)
            resp = []
            for paciente in asintomaticos:
                data = {
                    'id': paciente.id,
                    'nombre': paciente.nombre,
                    'apellido': paciente.apellido,
                    'fecha_alta': paciente.fecha_alta.strftime('%d-%m-%Y'),
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
