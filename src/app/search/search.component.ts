import { Component, OnInit } from '@angular/core';
import {RecipeDTO} from "../model/RecipeDTO.model";
import {ActivatedRoute} from "@angular/router";
import {RecipeService} from "../services/recipe.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  id: string;
  recipesName: RecipeDTO[] =[];

  constructor(private route: ActivatedRoute, private recipeService: RecipeService,private _sanitizer: DomSanitizer) {
    this.id = this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.getSearchResults();

    this.route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id) {
        this.getSearchResults();
      }
    });
  }


  getSearchResults(): void {
    this.recipeService.getRecipesSearch(this.id).subscribe((recipesName:RecipeDTO[]) => {
      this.recipesName = recipesName;
      this.recipesName.forEach((recipe:RecipeDTO)=> {
        let imagelist:any = [];
        recipe.encodeImage.forEach((encode:string)=> {imagelist.push(this._sanitizer.bypassSecurityTrustResourceUrl(encode));})
        recipe.image = imagelist;

      })

    });

  }

}
