import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
 providedIn: 'root'
})
export class DataService {
    private product$ = new BehaviorSubject<any>({});
    selectedProduct$ = this.product$.asObservable();
    private approvlTaskDetails$ = new BehaviorSubject<any>([]);
    selectedapprovlTaskDetails$ = this.approvlTaskDetails$.asObservable();
    setProduct(product: any) {
      this.product$.next(product);
    }
    setApprovalTaskDetail(approvlTaskDetail: any) {
        this.approvlTaskDetails$.next(approvlTaskDetail);
    }
}