import { Component, OnInit } from '@angular/core';
import { User } from '../account/register/user.model';
import { AccountService } from '../services/account.service';
import { RecipeServiceService } from '../services/recipe-service.service';
import { Recepie } from './receipe.model';

@Component({
  selector: 'app-recepies',
  templateUrl: './recepies.page.html',
  styleUrls: ['./recepies.page.scss'],
})
export class RecepiesPage implements OnInit {
recipes: Recepie[]
user: User;


  constructor( private recipeServie : RecipeServiceService,
    private accountService: AccountService
    ) { 
      this.accountService.user.subscribe(x => this.user = x);
    }

  ngOnInit() {
   this.recipes= this.recipeServie.getAllRecipes();
  }


  logout() {
    this.accountService.logout();

  }


}
