import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiReference } from 'src/app/constants/api-reference';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  getStudentDetailsApi(): Observable<any> {
    return this.http.get<any>(ApiReference.studentDetails +"/getallstudents");
  }

  postStudentDetailsApi(data: any): Observable<any> {
    return this.http.post(ApiReference.studentDetails + "/save", data);
  }

  updateStudentDetailApi(id: number, data: any): Observable<any> {
    return this.http.put(ApiReference.studentDetails + "/" + id, data);
  }

  deleteStudentDetailsApi(id: number): Observable<any> {
    return this.http.delete(ApiReference.studentDetails + "/" + id);
  }
}
