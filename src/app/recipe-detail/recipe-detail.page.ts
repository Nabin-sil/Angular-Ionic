import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Recepie } from '../recepies/receipe.model';
import { RecipeServiceService } from '../services/recipe-service.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.page.html',
  styleUrls: ['./recipe-detail.page.scss'],
})
export class RecipeDetailPage implements OnInit {
loadedRecipe : Recepie;

  constructor( private activatedRoute: ActivatedRoute, private recipeService: RecipeServiceService,
    private router: Router, private alertcontoller: AlertController ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe( paramMap=>{
      if(!paramMap.has('receipeId')){
        this.router.navigate(['/recepies'])

       return;
      }

      const receipeId = paramMap.get('receipeId');
      this.loadedRecipe = this.recipeService.getRecipeByID(receipeId);
    })
    
  }

  onDelete(){
    this.alertcontoller.create({ header: 'Are you sure?', message:'Do you want to delete this recipe?',
  buttons: [{
    text: 'Cancel',
    role: 'cancel'
  },{
    text: 'Delete',
    handler: ()=>{
      this.recipeService.deleteRecipe(this.loadedRecipe.id);
      this.router.navigate(['/recepies'])
    }
  }
]
})
   .then(alertEl =>{
     alertEl.present();
   })
  }

}
