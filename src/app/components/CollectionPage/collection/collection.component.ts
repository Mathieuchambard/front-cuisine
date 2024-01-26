import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Collection } from 'src/app/model/collection.model';
import { RecipeDTO } from 'src/app/model/RecipeDTO.model';
import { CollectionService } from 'src/app/services/collection.service';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {

  recipesName: RecipeDTO[] =[];
  collection!: Collection;
  collectionName!: string;
  

  constructor(private route: ActivatedRoute, private recipeService: RecipeService,private collectionService:CollectionService) { 
    this.collectionName = this.route.snapshot.paramMap.get('id')!;

  }

  ngOnInit(): void {
    this.recipeService.getAllRecipeCollection(this.collectionName).subscribe((recipesName:RecipeDTO[]) => {
        this.recipesName = recipesName; 
    });
    this.collectionService.getCollection(this.collectionName).subscribe((coll:Collection) => {
      this.collection = coll; 
  });

  }



}
