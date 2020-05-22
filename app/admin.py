from django.contrib import admin

from . import models
from . import utils

# Register your models here.
@admin.register(models.Provincia)
class ProvinciaAdmin(admin.ModelAdmin):
    list_display = ('id', 'nombre')
    search_fields = ('id', 'nombre')


@admin.register(models.Hospital)
class HospitalAdmin(admin.ModelAdmin):
    list_display = (
        'id', 'nombre', 'direccion', 'localidad', 'provincia')
    search_fields = (
        'id', 'nombre', 'direccion', 'localidad', 'provincia__nombre')


class EstadoFilter(admin.SimpleListFilter):
    title = 'estado'
    parameter_name = 'estado'

    def lookups(self, request, model_admin):
        return utils.estados

    def queryset(self, request, queryset):
        qs = queryset
        if self.value() in [s[0] for s in utils.estados]:
            qs = queryset.filter(estado=self.value()).all()
        return qs

class GeneroFilter(admin.SimpleListFilter):
    title = 'genero'
    parameter_name = 'genero'

    def lookups(self, request, model_admin):
        return utils.generos

    def queryset(self, request, queryset):
        qs = queryset
        if self.value() in [s[0] for s in utils.generos]:
            qs = queryset.filter(genero=self.value()).all()
        return qs

@admin.register(models.Paciente)
class PacienteAdmin(admin.ModelAdmin):
    list_display = ('id', 'nombre', 'apellido', 'genero', 'fecha_nacimiento',
                    'estado', 'fecha_alta')
    search_fields = ('id', 'nombre', 'apellido')
    list_filter = (EstadoFilter, GeneroFilter)

@admin.register(models.Recurso)
class RecursoAdmin(admin.ModelAdmin):
    list_display = ('id', 'nombre', 'descripcion', 'estado', 'cantidad')
    search_fields = ('id', 'nombre', 'estado')