import React, { Component } from 'react'
import axios from 'axios'
import {Doughnut,Line} from 'react-chartjs-2';
import './Reporte.css'



export class Reporte extends Component {
    state = {
        pacientes: [],
        pacientesHoy: [],
        pacientesProvincias: [],
        hospitales: [],
        provincias: [],
        fecha: '',
        datos: {
            labels: [
                'Asintomáticos',
                'Sintomáticos',
                'Fallecidos'
            ],
            datasets: [{
                data: [300, 50, 25],
                backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
                ],
                hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
                ]
            }]
        },
        datosline: {
            labels: ['Mar', 'Abr', 'May', 'Jun', 'Jul','Ago','Sep','Oct','Nov'],
            datasets: [
              {
                label: 'Contagios por mes',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [20, 59, 280, 481, 1200]
              }
            ]
          },
    }
    

    async componentDidMount() {
        await this.getHospitales()
        await this.getProvincias()
        await this.getPacientes()
        this.getFechaActual()
        this.getPacientesForDay('')
        console.log(this.state.pacientes)
        console.log(this.state.hospitales)
        console.log(this.state.provincias)
        console.log(this.state.fecha)
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
                            <li>
                                <p>Contagios por Provincias:</p>
                            </li>
                                <ul>
                                    <li></li>
                                </ul>
                        </ul>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <h6>Estadistica de Pacientes Por Estado Actual:</h6>
                        <Doughnut data={this.state.datos} />
                    </div>
                    <div className="col-md-6">
                        <h6>Curva de contagios mensual:</h6>
                        <Line data={this.state.datosline} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Reporte
