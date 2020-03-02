import { Target } from './target.model';

export class Clock {
    name: string;
    active?: boolean = false;
    target: Target;
    specialName?: string;
}