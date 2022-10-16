import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITask } from './model/task';

@Injectable({
  providedIn: 'root',
})
export class TodoServicesService {
  constructor(private http: HttpClient) {}

  addTask(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/api/v1/todo', data);
  }

  getAllTodos(): Observable<ITask[]> {
    return this.http.get<ITask[]>('http://localhost:3000/api/v1/todos');
  }

  updateTaskDone(data: any): Observable<any> {
    return this.http.put('http://localhost:3000/api/v1/todo/' + data._id, data);
  }

  deleteTask(taskid:any){
    return this.http.delete('http://localhost:3000/api/v1/todo/' + taskid);
  }
}
