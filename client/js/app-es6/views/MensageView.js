import { View } from './View';

export class MensageView extends View {

    template(model) {
        return model.texto ? `<p class="alert alert-info">${model.texto}</p>` : `<p></p>`;
    }

}