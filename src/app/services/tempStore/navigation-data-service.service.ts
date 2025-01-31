import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavigationDataServiceService {
  private data: any;
  private apiData: any;
  private isData: boolean = false;
  private isApiData: boolean = false;

  constructor() {}

  setData(data: any) {
    this.isData = true;
    this.data = data;
  }

  getData() {
    return this.data;
  }

  getIsData() {
    return this.isData;
  }

  clearData() {
    this.data = null;
  }

  setApiData(data: any) {
    this.isApiData = true;
    this.apiData = data;
  }

  getApiData() {
    return this.apiData;
  }

  getIsApiData() {
    return this.isApiData;
  }

  clearApiData() {
    this.apiData = null;
  }
}