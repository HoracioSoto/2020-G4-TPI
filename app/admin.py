from django.contrib import admin

from .models import Paciente

# Register your models here.

class EstadoFilter(admin.SimpleListFilter):
    title = 'estado'
    parameter_name = 'estado'

    def lookups(self, request, model_admin):
        return Paciente._ESTADOS

    def queryset(self, request, queryset):
        qs = queryset
        if self.value() in [s[0] for s in Paciente._ESTADOS]:
            qs = queryset.filter(estado=self.value()).all()
        return qs

class GeneroFilter(admin.SimpleListFilter):
    title = 'genero'
    parameter_name = 'genero'

    def lookups(self, request, model_admin):
        return Paciente._GENEROS

    def queryset(self, request, queryset):
        qs = queryset
        if self.value() in [s[0] for s in Paciente._GENEROS]:
            qs = queryset.filter(genero=self.value()).all()
        return qs

@admin.register(Paciente)
class PacienteAdmin(admin.ModelAdmin):
    list_display = ('id', 'nombre', 'apellido', 'genero', 'fecha_nacimiento',
                    'estado', 'asintomatico', 'fecha_alta')
    search_fields = ('id', 'nombre', 'apellido')
    list_filter = ('asintomatico', EstadoFilter, GeneroFilter)