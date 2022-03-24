import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../../services/state.service';
import { MovieService } from '../../services/movie.service';
import { Subscription } from 'rxjs';
import { Movie } from '../../models/Movie.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit, OnDestroy {

  public stuff: Movie[] = [];
  public part: number;
  public loading: boolean;

  private stuffSub: Subscription;
  private partSub: Subscription;

  constructor(private state: StateService,
              private stuffService: MovieService,
              private router: Router) { }

  ngOnInit() {
    this.loading = true;
    this.state.mode$.next('list');
    this.stuffSub = this.stuffService.stuff$.subscribe(
      (stuff) => {
        this.stuff = stuff;
        this.loading = false;
      }
    );
    this.partSub = this.state.part$.subscribe(
      (part) => {
        this.part = part;
      }
    );
    this.stuffService.getStuff();
  }

  onProductClicked(id: string) {
    if (this.part === 1) {
      this.router.navigate(['/part-one/movie/' + id]);
    } else if (this.part === 3) {
      this.router.navigate(['/part-three/movie/' + id]);
    } 
  }

  ngOnDestroy() {
    this.stuffSub.unsubscribe();
    this.partSub.unsubscribe();
  }

}
