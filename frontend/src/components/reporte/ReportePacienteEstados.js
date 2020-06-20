import React, { Component } from 'react'
import axios from 'axios'
import {Doughnut} from 'react-chartjs-2';

export class ReportePacienteEstados extends Component {

    state={
        pacientes: [],
        datosEstado: {
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
        asintomaticos: '',
        sintomaticos: '',
        fallecidos: ''
    }

    async componentDidMount() {
        await this.getPacientes()
        await this.filterPacientesEstado()
    }

    getPacientes = async () => {
        const res = await axios.get('http://localhost:8000/api/paciente/')
        this.setState({ pacientes: res.data })
    }

    filterPacientesEstado = async () => {
        let pacientes = await this.state.pacientes
        // console.log('lista pacientes ready', pacientes)

        const asintomaticos = pacientes.filter(paciente => paciente.estado != 'F' && paciente.condicion === 'A')
        const sintomaticos = pacientes.filter(paciente => paciente.estado != 'F' && paciente.condicion === 'S')
        const fallecido = pacientes.filter(paciente => paciente.estado === 'F')
        
        this.setState({
            datosEstado: {
                labels: [
                    'Asintomáticos',
                    'Sintomáticos',
                    'Fallecidos'
                ],
                datasets: [{
                    data: [asintomaticos.length, sintomaticos.length, fallecido.length],
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
            asintomaticos:'Asintomáticos '+(this.getPorcentaje(pacientes.length,asintomaticos.length))+'%',
            sintomaticos:'Sintomáticos '+(this.getPorcentaje(pacientes.length,sintomaticos.length))+'%',
            fallecidos:'Fallecidos '+(this.getPorcentaje(pacientes.length,fallecido.length))+'%'
        })
    }

    getPorcentaje = (total,valor) =>{
        return (valor*100)/total
    }

    render() {
        return (
            <div>
                <h6 className="py-2">Estadistica de Pacientes Por Estado Actual:</h6>
                <Doughnut data={this.state.datosEstado} />
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <span className="font-OpenSans font-size-reporte">
                            {this.state.asintomaticos}
                        </span>
                    </li>
                    <li className="nav-item">
                        <span className="font-OpenSans font-size-reporte">
                            {this.state.sintomaticos}
                        </span>
                    </li>
                    <li className="nav-item">
                        <span className="font-OpenSans font-size-reporte">
                            {this.state.fallecidos}
                        </span>
                    </li>
                </ul>
            </div>
        )
    }
}

export default ReportePacienteEstados
