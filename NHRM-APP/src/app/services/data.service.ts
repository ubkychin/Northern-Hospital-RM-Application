import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  termsAcceptance: BehaviorSubject<boolean>; 

  constructor() { 
    this.termsAcceptance = new BehaviorSubject(null);
  }
}
