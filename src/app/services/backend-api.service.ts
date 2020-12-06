import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TreeviewItem } from 'ngx-treeview';

@Injectable({
  providedIn: 'root'
})

export class BackendApiService {
  public currentTreeSubject: BehaviorSubject<any>;
  public currentTree: Observable<any>;
  constructor() {
    this.currentTreeSubject = new BehaviorSubject(null);
    this.currentTree = this.currentTreeSubject.asObservable();
  }

  public get currentTreeValue(): any {
    return this.currentTreeSubject.value ;
  }

  getList = (): TreeviewItem[] => [new TreeviewItem(this.currentTreeValue)];
}
