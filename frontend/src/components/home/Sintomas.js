import React, { Component } from 'react'
import dif_respiratoria from '../../assets/sintomas/fiebre-dificultad-respirar.png'
import dolor_garganta from '../../assets/sintomas/fiebre-dolor-garganta.png'
import tos from '../../assets/sintomas/fiebre-tos.png'
import perdida_gusto from '../../assets/sintomas/perdida-olfato-gusto.png'

export class Sintomas extends Component {
    render() {
        return (
            <div>
                <div className="container">
                    <div className="row mb-5">
                        <div className="col-12">
                            <h1 className="font-weight-bold text-center">Sintomas</h1>
                        </div>
                    </div>
                    <div className="row mb-5 mx-auto">
                        <div className="col text-center">
                            <img src={tos} className="img-fluid img-sintoma" alt=""/>
                        </div>
                        <div className="col text-center">
                            <img src={dolor_garganta} className="img-fluid img-sintoma" alt=""/>
                        </div>
                        <div className="col text-center">
                            <img src={dif_respiratoria} className="img-fluid img-sintoma" alt=""/>
                        </div>
                        <div className="col-2 text-center">
                            <img src={perdida_gusto} className="img-fluid img-sintoma" alt=""/>
                        </div>
                    </div>
                    <div className="row mb-5">
                        <div className="col-10 mx-auto">
                            <p className="font-poppins h5 text-center">
                                Si tenés fiebre junto con tos, dolor de garganta o dificultad para respirar, o si presentás pérdida brusca del olfato y del gusto, consultá telefónicamente al sistema de salud de tu localidad.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Sintomas
