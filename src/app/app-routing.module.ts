import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { LoginComponent } from './login/login.component'; 
import { ArticleComponent } from './article/article.component'; 
import { ArticleviewComponent } from './articleview/articleview.component';


const routes: Routes = [  
  { path: '', redirectTo: '/Login', pathMatch: 'full' },  
  { path: 'Articlelist', component: ArticleComponent }, 
  { path: 'Login', component: LoginComponent },
  { path: 'Articleview/:id', component: ArticleviewComponent }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled', onSameUrlNavigation: 'reload'
  })

  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
