import React, { Component } from 'react'
import axios from 'axios'
import localidadesArgentina from '../../assets/json/localidades.json'
import ReporteDptos from './ReporteDptos';
import ReportePacienteEstados from './ReportePacienteEstados';
import ReporteMensual from './ReporteMensual';
import ReporteCiudades from './ReporteCiudades'
import './Reporte.css'



export class Reporte extends Component {
    state = {
        ciudades: [],
        pacientes: [],
        pacientesHoy: [],
        pacientesProvincias: [],
        hospitales: [],
        provincias: [],
        fecha: '',
    }
    

    async componentDidMount() {
        await this.getHospitales()
        await this.getProvincias()
        await this.getPacientes()
        this.getFechaActual()
        this.getPacientesForDay('')
        // console.log(this.state.pacientes)
        // console.log(this.state.hospitales)
        // console.log(this.state.provincias)
        // console.log(this.state.fecha)
    }

    getPacientes = async () => {
        const res = await axios.get('http://localhost:8000/api/paciente/')
        this.setState({ pacientes: res.data })
    }

    getHospitales = async () => {
        const res = await axios.get('http://localhost:8000/api/hospital/')
        this.setState({ hospitales: res.data })
    }

    getProvincias = async () => {
        const res = await axios.get('http://localhost:8000/api/provincia/')
        this.setState({ provincias: res.data })
    }

    getFechaActual = () => {
        let meses = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre")
        let diasSemana = new Array("Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado")
        let f = new Date()
        this.setState({ fecha: diasSemana[f.getDay()] + ", " + f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear() })
    }

    getPacientesForDay = (fecha) => {
        const pacientesdeldia = this.state.pacientes.filter(paciente => paciente.fecha = fecha)
        console.log(pacientesdeldia)
    }



    render() {
        return (
            <div className="container">
                <div className="row my-3">
                    <div className="col text-center">
                        <h2 className="font-poppins">Reporte Diario</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col text-right">
                        <p className="font-OpenSans">
                            {this.state.fecha}
                        </p>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col">
                        <ul>
                            <li>
                                <p>Contagios de hoy:
                                    <span className="font-weight-bold">
                                        &nbsp;{this.state.pacientes.length}
                                    </span>
                                </p>
                            </li>
                                <ul>
                                    <li>
                                        <p>Hombres:
                                            <span className="font-weight-bold">
                                                &nbsp;{this.state.pacientes.filter(paciente => paciente.genero === 'M').length}
                                            </span>
                                        </p>
                                    </li>
                                    <li>
                                        <p>Mujeres:
                                            <span className="font-weight-bold">
                                                &nbsp;{this.state.pacientes.filter(paciente => paciente.genero === 'F').length}
                                            </span>
                                        </p>
                                    </li>
                                </ul>
                            <li>
                                <p>Total Contagiados:
                                    <span className="font-weight-bold">
                                        &nbsp;{this.state.pacientes.length}
                                    </span>
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
                <hr/>
                <div className="row mt-5">
                    <div className="col-md-6">
                        <ReportePacienteEstados />
                    </div>
                    <div className="col-md-6">
                        <ReporteMensual/>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-md-6">
                        <ReporteDptos />
                    </div>
                    <div className="col-md-6">
                        <ReporteCiudades/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Reporte
