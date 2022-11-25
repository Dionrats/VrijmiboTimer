import {EventEmitter} from '@angular/core';

export interface Timer {
    title: string;
    max: number;
    color: string;
    heartbeat: EventEmitter<number>;
}
