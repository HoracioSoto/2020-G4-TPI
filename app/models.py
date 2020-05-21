from django.db import models

# Create your models here.
class Paciente(models.Model):
    _ESTADOS = [
        ('E', 'Enfermo'),
        ('N', 'Negativo'),
        ('C', 'Curado'),
        ('F', 'Fallecido'),
        ('EE', 'En espera'),
        ('A', 'Aislado'),
    ]

    _GENEROS = [
        ('M', 'Masculino'),
        ('F', 'Femenino'),
    ]

    nombre = models.CharField(blank=True, null=True, max_length=50)
    apellido = models.CharField(max_length=50)
    genero = models.CharField(
        max_length=1,
        choices=_GENEROS,
        default='M',
    )
    fecha_nacimiento = models.DateField()
    estado = models.CharField(
        max_length=2,
        choices=_ESTADOS,
        default='N',
        help_text='Estado en que se encuentra el paciente'
    )
    asintomatico = models.BooleanField(default=False)
    fecha_alta = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return '{} {}'.format(self.nombre, self.apellido) 
    