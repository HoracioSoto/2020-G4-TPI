from django.shortcuts import render
from django.http import JsonResponse

from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import *
from .serializers import *

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

    def get_serializer_class(self):
        if self.action == 'solicitud':
            return SolicitudRecursoSerializer
        return RecursoSerializer

    @action(methods=('post', ), detail=False)
    def solicitud(self, *args, **kwargs):
        s = self.get_serializer(data=self.request.data)
        s.is_valid(raise_exception=True)
        try:
            hospital = s.validated_data.get('hospital')
            sr = SolicitudRecurso()
            sr.hospital = s.validated_data.get('hospital')
            sr.motivo = s.validated_data.get('motivo')
            sr.detalle = s.validated_data.get('detalle')
            sr.save()
            # falta lógica para guardar los recursos solicitados
            return Response({
                'id': sr.id,
                'hospital': HospitalSerializer(sr.hospital).data,
                'motivo': sr.motivo,
                'detalle': sr.detalle,
                'estado': sr.estado
            })
        except Exception as e:
            return JsonResponse(
                data={'code': 500, 'message': str(e)}, status=500
            )
