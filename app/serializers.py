from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from .models import *


class ProvinciaSerializer(serializers.ModelSerializer):

    class Meta:
        model = Provincia
        fields = '__all__'


class HospitalSerializer(serializers.ModelSerializer):

    class Meta:
        model = Hospital
        fields = '__all__'

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['provincia'] = ProvinciaSerializer(instance.provincia).data
        return response


class PacienteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Paciente
        fields = '__all__'

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['medico'] = MedicoSerializer(instance.medico).data
        response['hospital'] = HospitalSerializer(instance.hospital).data
        return response


class MedicoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Medico
        fields = '__all__'

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['hospital'] = HospitalSerializer(instance.hospital).data
        return response


class RecursoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Recurso
        fields = '__all__'
