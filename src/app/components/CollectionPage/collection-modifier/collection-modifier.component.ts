import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { Collection } from 'src/app/model/collection.model';
import { Recipe } from 'src/app/model/recipe.model';
import { CollectionService } from 'src/app/services/collection.service';

@Component({
  selector: 'app-collection-modifier',
  templateUrl: './collection-modifier.component.html',
  styleUrls: ['./collection-modifier.component.scss']
})
export class CollectionModifierComponent implements OnInit {
  inputCollectionSubject: ReplaySubject<Collection> = new ReplaySubject();
  collectionName!: string;
  

  constructor(private route: ActivatedRoute, private collectionService: CollectionService) { 
    this.collectionName = this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.collectionService.getCollection(this.collectionName).subscribe((collection:Collection) => {
        this.inputCollectionSubject.next(collection);
    });
  }

}
