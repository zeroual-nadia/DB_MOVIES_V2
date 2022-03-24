import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../../services/state.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Movie } from '../../models/Movie.model';
import { MovieService } from '../../services/movie.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-single-movie',
  templateUrl: './single-movie.component.html',
  styleUrls: ['./single-movie.component.scss']
})
export class SingleMovieComponent implements OnInit, OnDestroy {

  public thing: Movie;
  public loading: boolean;
  public userId: string;
  public part: number;

  private partSub: Subscription;

  constructor(private state: StateService,
              private router: Router,
              private route: ActivatedRoute,
              private stuffService: MovieService,
              private auth: AuthService) { }

  ngOnInit() {
    this.loading = true;
    this.state.mode$.next('single-movie');
    this.userId = this.auth.userId ? this.auth.userId : 'userID40282382';
    this.route.params.subscribe(
      (params: Params) => {
        this.stuffService.getThingById(params.id).then(
          (thing: Movie) => {
            this.loading = false;
            this.thing = thing;
          }
        );
      }
    );
    this.partSub = this.state.part$.subscribe(
      (part) => {
        this.part = part;
        if (part >= 3) {
          this.userId = this.auth.userId;
        }
      }
    );
  }

  onGoBack() {
    if (this.part === 1) {
      this.router.navigate(['/part-one/all-movie']);
    } else if (this.part === 3) {
      this.router.navigate(['/part-three/all-movie']);
    } 
  }

  onModify() {
    switch (this.part) {
      case 1:
      case 2:
        this.router.navigate(['/part-one/modify-movie/' + this.thing._id]);
        break;
      case 3:
        this.router.navigate(['/part-three/modify-movie/' + this.thing._id]);
        break;
    }
  }

  onDelete() {
    this.loading = true;
    this.stuffService.deleteThing(this.thing._id).then(
      () => {
        this.loading = false;
        switch (this.part) {
          case 1:
          case 2:
            this.router.navigate(['/part-one/all-movie']);
            break;
          case 3:
            this.router.navigate(['/part-three/all-movie']);
            break;
        }
      }
    );
  }

  ngOnDestroy() {
    this.partSub.unsubscribe();
  }
}
