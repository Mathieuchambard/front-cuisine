import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Collection } from 'src/app/model/collection.model';
import { RecipeDTO } from 'src/app/model/RecipeDTO.model';
import { CollectionService } from 'src/app/services/collection.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {

  recipesName: RecipeDTO[] =[];
  collection!: Collection;
  collectionName!: string;
  

  constructor(private route: ActivatedRoute, private recipeService: RecipeService,private collectionService:CollectionService,private _sanitizer: DomSanitizer) { 
    this.collectionName = this.route.snapshot.paramMap.get('id')!;

  }

  ngOnInit(): void {
    this.recipeService.getAllRecipeCollection(this.collectionName).subscribe((recipesName:RecipeDTO[]) => {
        this.recipesName = recipesName; 
        this.recipesName.forEach((recipe:RecipeDTO)=> {
          let imagelist:any = [];
          recipe.encodeImage.forEach((encode:string)=> {imagelist.push(this._sanitizer.bypassSecurityTrustResourceUrl(encode));})
          recipe.image = imagelist;
  
        })
    });
    this.collectionService.getCollection(this.collectionName).subscribe((coll:Collection) => {
      this.collection = coll; 
  });

  }



}
