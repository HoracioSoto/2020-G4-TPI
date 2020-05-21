import requests

from .models import Paciente

def prueba():
    asintomaticos = Paciente.objects.filter(nombre__in=['Cesar', 'Tato'])
    print(asintomaticos)
    response = requests.get('http://127.0.0.1:8000/api/paciente/')
    print(response)

prueba()
