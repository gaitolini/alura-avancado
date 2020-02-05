import { View } from './View';
import { DateHelper } from '../helpers/DateHelper';
import { currentInstance } from "../controllers/NegociacaoController";

export class NegociacoesViews extends View {

    constructor(elemento) {

        super(elemento);

        elemento.addEventListener('click', event => {
            if (event.target.nodeName == 'TH')
                currentInstance().ordena(event.target.textContent.toLowerCase());


        });

    }

    template(model) {

        return `   
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th>DATA</th>
                    <th>QUANTIDADE</th>
                    <th>VALOR</th>
                    <th>VOLUME</th>
                    
                </tr>
            </thead>

            <tbody>
                ${model.negociacoes.map(n => `
                    <tr>
                        <td>${DateHelper.dateToStr(n.data)}</td>
                        <td>${n.quantidade}</td>
                        <td>${n.valor}</td>
                        <td>${n.quantidade * n.valor}</td>
                        
                    </tr>
                `).join('')}
            </tbody>

            <tfoot>
                <td colspan="3"></>
                <td>${model.volumeTotal}</td>
            </tfoot>
        </table>`
    }

}