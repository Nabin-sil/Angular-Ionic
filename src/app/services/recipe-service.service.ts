import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Recepie } from '../recepies/receipe.model';
import {  HttpHeaders, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Employee } from '../employee/employee.model';



const endpoint: string = `${environment.apiUrl}/employee`;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RecipeServiceService {
private  recipes: Recepie[]=[
    {
      id :'r1',
      title:'Pizza',
      imageUrl:'http://wallpapersdsc.net/wp-content/uploads/2015/11/Pizza_HD3.jpg',
      incredients: ['frech firs', 'chilli', 'salt']
      },
      
      {
        id :'r2',
        title:'Burger',
        imageUrl:'https://offloadmedia.feverup.com/secretlosangeles.com/wp-content/uploads/2020/05/22093453/montys-e1590707262192.jpg',
        incredients:['salt', 'cheese', 'donalds']
        },

        {
          id :'r3',
          title:'Sandwich',
          imageUrl:'https://i1.wp.com/nypost.com/wp-content/uploads/sites/2/2014/03/sandwich.jpg?quality=90&strip=all&ssl=1',
          incredients:['salt', 'cheese', 'donalds']
          },
         
          {
            id :'r4',
            title:'Pasta',
            imageUrl:'http://www.cottercrunch.com/wp-content/uploads/2016/11/creamy-tomato-gluten-free-penne-pasta-4.jpg',
            incredients:['salt', 'cheese', 'donalds']
            },
  ]
  

  constructor() { }

  getAllRecipes(){
    return [...this.recipes];
  }

  getRecipeByID(receipeId:string){
    return{
      ...this.recipes.find(recipe=>{
        return recipe.id === receipeId;
      }
        
      )
    }
  }

deleteRecipe(receipeId: string){
  this.recipes = this.recipes.filter(recipe =>{
    return recipe.id !== receipeId;
  })
}


}



@Injectable({ providedIn: 'root' })
export class EmployeeService {
    selectedEmployee: Employee;

   // endpoint: string = `${environment.apiUrl}/products`;
   // headers = new HttpHeaders().set('Content-Type', 'application/json');
  
    constructor(private http: HttpClient) { }
  
    // Add employee
    addEmployee(data: Employee): Observable<any> {
      let API_URL = `${endpoint}/addEmployee`;
      return this.http.post(API_URL, data, httpOptions)
        .pipe(
          catchError(this.errorMgmt)
        )
    }
    
  
    // Get all employee
    getEmployees():Observable<any> {
      return this.http.get(`${endpoint}`, httpOptions);
    }
  
    // Get Employee by id
    getEmployeeById(id): Observable<any> {
      let API_URL = `${endpoint}/editEmployee/${id}`;
      return this.http.get(API_URL, httpOptions)
        .pipe(
          map((res: Response) => {
            return res || {}
          }),
          catchError(this.errorMgmt)
        )
    }
  
//     getById(id: string) {
//       return this.http.get<Product>(`${endpoint}/read/${id}`);
//   }


    // Update Employee
    updateEmployee(id, data): Observable<any> {
      let API_URL = `${endpoint}/updateEmployee/${id}`;
      return this.http.patch(API_URL, data, httpOptions)
        .pipe(
          catchError(this.errorMgmt)
        )
    }
  
    // Delete employee
    deleteEmployee(_id: string) {
      var API_URL = `${endpoint}/deleteEmployee/${_id}`;
      return this.http.delete(API_URL)
        .pipe(
          catchError(this.errorMgmt)
        )
    }


    // Error handling 
    errorMgmt(error: HttpErrorResponse) {
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
        // Get client-side error
        errorMessage = error.error.message;
      } else {
        // Get server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      console.log(errorMessage);
      return throwError(errorMessage);
    }
  
  }

