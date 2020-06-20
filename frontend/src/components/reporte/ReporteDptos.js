import React, { Component } from 'react'
import axios from 'axios'
import localidadesArgentina from '../../assets/json/localidades.json'
import {Bar} from 'react-chartjs-2';

export class ReporteDptos extends Component {
    state = {
        ciudades: [],
        pacientes: [],
        contagiosDepartamento: [],
        datosDepartamentos : {
            labels: [],
            datasets: [
              {
                label: '',
                backgroundColor: '',
                borderColor: 'r',
                borderWidth: 1,
                hoverBackgroundColor: '',
                hoverBorderColor: '',
                data: []
              }
            ]
          },
    }

    async componentDidMount() {
        await this.getCiudades()
        await this.getPacientes()
        await this.getPacientesDepartamentos()
        await this.setDatosGrafica()
    }

    getPacientes = async () => {
        const res = await axios.get('http://localhost:8000/api/paciente/')
        this.setState({ pacientes: res.data })
    }

    getCiudades = async () => {
        await this.setState({ ciudades: localidadesArgentina})
        const ciudadesChaco = this.state.ciudades.localidades.filter(localidad => localidad.provincia.nombre === 'Chaco')
        
        let localidadesChaco = []
        for (let i = 0; i < ciudadesChaco.length; i++) {
            const localidad = {
                "departamento": ciudadesChaco[i].departamento.nombre,
                "localidad": ciudadesChaco[i].nombre,
            }
            localidadesChaco.push(localidad)
        }
        
        this.setState({ ciudades: localidadesChaco })
        //console.log('Localidades Filtradas', this.state.ciudades);
    }

    getPacientesDepartamentos = async () => {
        // Obtener todos los departamentos del chaco
        let deptos = await this.state.ciudades

        // Ordenar todos los departamentos alfabeticamente
        if(deptos) deptos = deptos.sort((a, b) => a.departamento.localeCompare(b.departamento))
        // console.log('dpetos ordenados', deptos)

        let depto = deptos[0].departamento
        let localidad = {
            "nombre": '',
            "contagios": 0
        }
        let ciudadesdptos = {
            "departamento": '',
            "contagios": 0,
            "ciudades": []
        }
        let ListaDptoCiudades = []

        for (let i = 0; i < deptos.length; i++) {
            localidad.nombre = deptos[i].localidad
            //console.log(localidad)

            if(depto != deptos[i].departamento){
                ciudadesdptos.departamento=depto
                // console.log(ciudadesdptos)
                
                ListaDptoCiudades.push(ciudadesdptos)
                
                depto = deptos[i].departamento
                ciudadesdptos = {
                    "departamento": '',
                    "contagios": 0,
                    "ciudades": []
                }
            }

            ciudadesdptos.ciudades.push(localidad)
            localidad = {
                "nombre": '',
                "contagios": 0
            }
        }

        ciudadesdptos.departamento=depto
        ListaDptoCiudades.push(ciudadesdptos)
        ciudadesdptos = {
            "departamento": '',
            "contagios": 0,
            "ciudades": []
        }

        // console.log('Deptos-Ciudades',ListaDptoCiudades)

        // Obtener Lista de pacientes
        let pacientes = await this.state.pacientes

        // Ordenar la lista de pacientes por localidad
        if(pacientes) pacientes = pacientes.sort( (a,b) => a.localidad.localeCompare(b.localidad) )
        // console.log('pacientes ordenados por localidad:', pacientes)

        let localidadPaciente = pacientes[0].localidad
        let contagiadoLocalidad = 0

        for (let i = 0; i < pacientes.length; i++) {
            if(localidadPaciente != pacientes[i].localidad){
                // console.log(localidadPaciente.toUpperCase())
                ListaDptoCiudades.map(depto => 
                    depto.ciudades.map(
                        ciudad => {
                            if(ciudad.nombre === localidadPaciente.toUpperCase()){
                                ciudad.contagios=contagiadoLocalidad
                                // console.log(ciudad)
                                depto.contagios+=contagiadoLocalidad
                                // console.log(depto)
                            }
                        }
                    )
                )
                
                localidadPaciente = pacientes[i].localidad
                contagiadoLocalidad= 0
            }
            
            contagiadoLocalidad++
        }
        // console.log(localidadPaciente.toUpperCase())
        ListaDptoCiudades.map(depto => 
            depto.ciudades.map(
                ciudad => {
                    if(ciudad.nombre === localidadPaciente.toUpperCase()){
                        ciudad.contagios=contagiadoLocalidad
                        // console.log(ciudad)
                        depto.contagios+=contagiadoLocalidad
                        // console.log(depto)
                    }
                }
            )
        )
        localidadPaciente = ''
        contagiadoLocalidad= 0
        
        let contagiosDeptos = ListaDptoCiudades.sort( (a,b) => b.contagios - a.contagios )
        this.setState({ contagiosDepartamento: contagiosDeptos })
        //console.log('Contagios-Deptos-Ciudades',  this.state.contagiosDepartamento)
    }

    setDatosGrafica = async () => {
        let datos = await this.state.contagiosDepartamento
        // console.log('se recibio datos',datos)
        
        let nombreDptos = []
        let contagiosDeptos = []

        datos.map( dato => {
            if(dato.contagios > 0){
                nombreDptos.push(dato.departamento)
                contagiosDeptos.push(dato.contagios)
            }
        })

        this.setState({
            datosDepartamentos:{
                labels: nombreDptos,
                datasets: [
                    {
                        label: 'Contagios por Departamentos',
                        backgroundColor: 'rgba(255,99,132,0.2)',
                        borderColor: 'rgba(255,99,132,1)',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                        hoverBorderColor: 'rgba(255,99,132,1)',
                        data: contagiosDeptos
                    }
                ]
            }
        })
        
    }
    
    render() {
        return (
            <div>
                <h6 className="py-2">Contagios por Departamentos:</h6>
                <Bar data={this.state.datosDepartamentos} />
            </div>
        )
    }
}

export default ReporteDptos
