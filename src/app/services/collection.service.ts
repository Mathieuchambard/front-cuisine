import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Collection } from '../model/collection.model';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  configUrl = 'http://localhost:8080';


  constructor(private http: HttpClient) {}

  getAllCollections(): Observable<Collection[]> {
    return this.http.get<Collection[]>(this.configUrl + "/collections");
  }

  getCollection(nameId:string): Observable<Collection>{
    return this.http.get<Collection>(this.configUrl + "/collection/" + nameId);
  }

  postCollection(collection:Collection): Observable<Collection> {
    return this.http.post<Collection>(this.configUrl + "/post/collection",collection);
  }

  modifyCollection(nameId:string,collection:Collection): Observable<Collection>{
    return this.http.post<Collection>(this.configUrl + "/modify/collection/"+nameId,collection);
  }

  deleteCollection(nameId:string): Observable<string> {
    return this.http.delete<string>(this.configUrl + "/deleteCollection/" + nameId);
  }
}
