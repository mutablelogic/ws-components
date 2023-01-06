
import { Model, ModelProperty } from './core/model';

export class Instance extends Model {
    @ModelProperty
    Name = ""

    @ModelProperty
    Service = "";

    @ModelProperty
    Expires = new Date();

    @ModelProperty
    Number = 100;
}
