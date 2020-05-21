from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from .models import Paciente

class PacienteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Paciente
        fields = '__all__'
