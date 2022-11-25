import {Target} from './target.model';

export class Clock {
    name: string;
    active = false;
    target: Target;
    specialName?: string;
}
