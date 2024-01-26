import { Component, OnInit } from '@angular/core';
import { Collection } from 'src/app/model/collection.model';
import { CollectionService } from 'src/app/services/collection.service';

@Component({
  selector: 'app-collections-display',
  templateUrl: './collections-display.component.html',
  styleUrls: ['./collections-display.component.scss']
})
export class CollectionsDisplayComponent implements OnInit {

  collectionList!:Collection[];


  constructor(private collectionService: CollectionService) { 
  }

  ngOnInit(): void {
    this.collectionService.getAllCollections().subscribe((collectionList:Collection[]) => {
        this.collectionList = collectionList;
    });
  }

  pressDelete(nameId:string):void{
    this.collectionService.deleteCollection(nameId).subscribe();
    this.collectionList = this.collectionList.filter(collection => collection.nameId !== nameId);  
  }

}
