import { HttpClient, HttpResponse } from '@angular/common/http';
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
    return this.http.get<Collection>(this.configUrl + "/collections/" + nameId);
  }

  postCollection(collection:Collection): Observable<HttpResponse<Collection>> {
    return this.http.post<HttpResponse<Collection>>(this.configUrl + "/collections",collection);
  }

  modifyCollection(nameId:string,collection:Collection): Observable<HttpResponse<Collection>>{
    return this.http.put<HttpResponse<Collection>>(this.configUrl + "collections/"+nameId,collection);
  }

  deleteCollection(nameId:string): Observable<string> {
    return this.http.delete<string>(this.configUrl + "/collections/" + nameId);
  }
}
