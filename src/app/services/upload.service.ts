import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UploadService {
  constructor(private http: HttpClient) { }
  uploadFile(formData) {
    return this.http.post('https://ctplindia.co.in/nadeem/testApp/api/v1/uploadImage', formData);
  }
  
    addBday(formData) {
    return this.http.post('https://ctplindia.co.in/nadeem/testApp/api/v1/addBday', formData);
  }
	updateBday(formData) {
    return this.http.post('https://ctplindia.co.in/nadeem/testApp/api/v1/updateBday', formData);
  }
	deleteBday(formData) {
    return this.http.post('https://ctplindia.co.in/nadeem/testApp/api/v1/deleteBday', formData);
  }
      getData() {
    return this.http.get('https://ctplindia.co.in/nadeem/testApp/api/v1/getData');
  }  
	  getBdayDetails (id) {
    return this.http.get('https://ctplindia.co.in/nadeem/testApp/api/v1/getBdayData/'+id);
  }
}