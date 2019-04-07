import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Dashboard } from '@app/models/dashboard.model';


@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  // constructor(private _http: HttpClient) { }

  // public loadActiveSapProductionOrders (): Observable<[]>{
  //   return this._http.get('https://localhost:5001/api/Data/ActiveSapProductionOrders').pipe(
  //     map((response: any) => response)
  //     );
  // }

  // public loadAvailableSapProductionOrders(): Observable<[]> {
  //   return this._http.get('https://localhost:5001/api/Data/AvailableSapProductionOrders').pipe(
  //     map((response: any) => response));
  // }

  // public loadRollCars(): Observable<[]> {
  //   return this._http.get('https://localhost:5001/api/RollCars').pipe(
  //     map((response: any) => response));
  // }

//   this.http.get('https://localhost:5001/api/Data/ActiveSapProductionOrders')
//   .subscribe((res: SapProductionOrder[] )=> {
//     this.ResourceStore.dispatch(new ActiveSapProductionOrderActions.LoadSuccess(res));
//     console.log(res);
//   })
  
//   // Populate SapProductionOrder
//   this.http.get('https://localhost:5001/api/Data/AvailableSapProductionOrders')
//     .subscribe((res: SapProductionOrder[] )=> {
//     this.ResourceStore.dispatch(new SapProductionOrderActions.LoadSuccess(res));
//     console.log(res);
//   })

//   this.http.get('https://localhost:5001/api/RollCars')
//   .subscribe((res: RollCar[] )=> {
//   this.ResourceStore.dispatch(new RollCarActions.LoadSuccess(res));
//   console.log(res);
// })
  // public updateRollCar(rollCar: RollCar): any {
  //   return this._http.put(`https://localhost:5001/api/RollCars/${rollCar.id}`, rollCar);
  // }

  // public getWaitingareas(): any {
  //   return this._http.get(`https://localhost:5001/api/WaitingAreas`).pipe(
  //     map((waitingArea: WaitingArea) => waitingArea)
  //   );
  // }

  // public updateWaitingArea(waitingArea: Partial<WaitingArea>, id: string | number): any {
  //   return this._http.put(`https://localhost:5001/api/WaitingAreas/${id}`, waitingArea).pipe(
  //     map((waitingArea: WaitingArea) => waitingArea)
  //   );
  // }

  public weigh(scale): number {
    return 50 + Math.floor(Math.random() * 10);
  }
}
