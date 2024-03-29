import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeDTO } from 'src/app/model/RecipeDTO.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-all-recette',
  templateUrl: './all-recette.component.html',
  styleUrls: ['./all-recette.component.scss']
})
export class AllRecetteComponent implements OnInit {

  recipesName: RecipeDTO[] =[];  

  constructor(private route: ActivatedRoute, private recipeService: RecipeService,private _sanitizer: DomSanitizer) { 
  
  }

  ngOnInit(): void {
    this.recipeService.getAllRecipes().subscribe((recipesName:RecipeDTO[]) => {
      this.recipesName = recipesName; 
      this.recipesName.forEach((recipe:RecipeDTO)=> {
        let imagelist:any = [];
        recipe.encodeImage.forEach((encode:string)=> {imagelist.push(this._sanitizer.bypassSecurityTrustResourceUrl(encode));})
        recipe.image = imagelist;

      })
      
    });
  }


}
