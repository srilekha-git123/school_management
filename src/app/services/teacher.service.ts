import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiReference } from '../constants/api-reference';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private http: HttpClient) { }
  
  getExamDetailsApi(): Observable<any> {
    return this.http.get<any>(ApiReference.teacherDetails +"/getall");
  }

  postExamDetailsApi(data: any): Observable<any> {
    return this.http.post(ApiReference.teacherDetails + "/save", data);
  }

  updateExamDetailApi(id: number, data: any): Observable<any> {
    return this.http.put(ApiReference.teacherDetails + "/" + id, data);
  }

  deleteExamDetailsApi(id: number): Observable<any> {
    return this.http.delete(ApiReference.teacherDetails + "/" + id);
  }
}
