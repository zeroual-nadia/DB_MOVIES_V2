import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartOneComponent } from './part-one/part-one.component';
import { PartThreeComponent } from './part-three/part-three.component';
import { DefaultComponent } from './default/default.component';
import { MovieListComponent } from './part-one/movie-list/movie-list.component';
import { NewMovieComponent } from './part-one/new-movie/new-movie.component';
import { SingleMovieComponent } from './part-one/single-movie/single-movie.component';
import { ModifyMovieComponent } from './part-one/modify-movie/modify-movie.component';
import { LoginComponent } from './part-three/auth/login/login.component';
import { SignupComponent } from './part-three/auth/signup/signup.component';
import { AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  { path: 'part-one', component: PartOneComponent,
    children: [
      { path: 'new-movie', component: NewMovieComponent },
      { path: 'all-movie', component: MovieListComponent },
      { path: 'movie/:id', component: SingleMovieComponent },
      { path: 'modify-movie/:id', component: ModifyMovieComponent },
      { path: '', pathMatch: 'full', redirectTo: 'all-movie' },
      { path: '**', redirectTo: 'all-stuff' }
    ]
  },
  { path: 'part-three', component: PartThreeComponent,
    children: [
      { path: 'new-movie', component: NewMovieComponent, canActivate: [AuthGuard] },
      { path: 'all-movie', component: MovieListComponent, canActivate: [AuthGuard] },
      { path: 'movie/:id', component: SingleMovieComponent, canActivate: [AuthGuard] },
      { path: 'modify-movie/:id', component: ModifyMovieComponent, canActivate: [AuthGuard] },
      { path: 'auth/login', component: LoginComponent },
      { path: 'auth/signup', component: SignupComponent },
      { path: '', pathMatch: 'full', redirectTo: 'auth/login' },
      { path: '**', redirectTo: 'all-movie' }
    ]
  },
  { path: 'default', component: DefaultComponent },
  { path: '', pathMatch: 'full', component: DefaultComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthGuard
  ]
})
export class AppRoutingModule {}
