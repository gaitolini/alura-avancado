class DateHelper {

    constructor() {
        throw new Error('Esta classe não pode ser instanciada');
    }
    static strToDate(str) {
        if (!/\d{4}-\d{2}-\d{2}/.test(str))
            throw new Error('Deve estar no formato aaaa-mm-dd');
        return new Date(...str.split('-').map((item, i) => item - i % 2));
    }

    static dateToStr(date) {
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        // return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

    }
}