export class GMTHelper {

    static convertToGMTDate(value:Date){
        if (!value) {
            return "";
        }
        return value.toJSON().slice(0,10);
    }
}