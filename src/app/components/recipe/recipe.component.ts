import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from 'src/app/model/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';


@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {

  id: string;
  recipe!: Recipe ;
  imagelist: any = [];
  slideIndex = 1;
  

  constructor(private route: ActivatedRoute,private recipeService: RecipeService,private _sanitizer: DomSanitizer) { 
    
    this.id = this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.recipeService.getRecipe(this.id).subscribe((recipe:Recipe) => {
      this.recipe = recipe;
      recipe.encodeImage.forEach((encode:string)=> {this.imagelist.push(this._sanitizer.bypassSecurityTrustResourceUrl(encode));})  });
      this.showSlides(this.slideIndex);
    }
  
    
    

  plusSlides(n:number):void {
    this.showSlides((this.slideIndex += n));
    }

  currentSlide(n:number):void {
      this.showSlides((this.slideIndex = n));
    }

  showSlides(n:number):void {
      var i;
      var slides = document.getElementsByClassName("mySlides") as HTMLCollectionOf<HTMLElement>;
      var dots = document.getElementsByClassName("dot") as HTMLCollectionOf<HTMLElement>;
      if (n > slides.length) {
        this.slideIndex = 1;
      }
      if (n < 1) {
        this.slideIndex = slides.length;
      }
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
      }
      slides[this.slideIndex - 1].style.display = "block";
      dots[this.slideIndex - 1].className += " active";
    }

}
