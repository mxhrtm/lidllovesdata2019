import { Injectable } from '@angular/core';
import { timer, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export interface Time {
    seconds: number;
    minutes: number;
    hours: number;
}

export interface Timer {
    id: string;
    timer: Observable<Time>;
}

@Injectable()
export class TimerService {

    private _listOfTimer: { [id: string]: Timer };

    constructor() {
        this._listOfTimer = {};
    }


    public startTimer(name: string) {
        const obj: Timer = {
            id: name,
            timer: timer(1000, 1000).pipe(
                switchMap((totalSeconds: number) => {
                    return new Observable(observer => {
                        const time: Time = {
                            seconds: totalSeconds % 60,
                            minutes:  Math.floor(totalSeconds / 60),
                            hours: Math.floor(totalSeconds / 60 / 24)
                        };
                        observer.next(time);
                    });
                }))
        };
        this._listOfTimer = {[name]: obj, ...this._listOfTimer};
    }

    public getTime(name: string): Observable<Time> {
        if (this._listOfTimer[name]) {
            return this._listOfTimer[name].timer;
        }
        return null;
    }

    public resetTimer(name: string) {
        const {[name]: removed, ...without}: { [id: string]: Timer } = this._listOfTimer;
        this._listOfTimer = without;
    }
}