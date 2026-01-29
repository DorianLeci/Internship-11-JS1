export class ErrorMessages {

    static INVALID_OPERAND = "Operand nije validan broj";

    static MISSING_SECOND_OPERAND = "Nedostaje drugi operand";

    static NO_OPERAND = "Ne postoji niti jedan operand";

    static CHAINING_OPERATOR = "Ulančavanje operacija nije dozvoljeno";

    static CHAINING_SIGN = "Ulančavanje predznaka broja nije dozvoljeno";

    static UNARY_AFTER_OPERAND = "Zabranjeno dodavanje operanada iza unarnog operatora";

    static UNARY_POSITION (label){
        return `Unarni operator "${label}" mora biti dodan prije operanda`;
    }
    
    static NO_OPERAND_BEFORE="Ne možeš dodati prvi operand tek iza operatora";

    static DIVIDE_BY_ZERO="Dijeljenje s nulom nije dozvoljeno";

    static NEGATIVE_FACTORIAL="Faktorijel je definiran samo za nenegativne cijele brojeve";

    static SQRT_NEGATIVE="Kvadratni korijen negativnog broja nije dozvoljen";

}
