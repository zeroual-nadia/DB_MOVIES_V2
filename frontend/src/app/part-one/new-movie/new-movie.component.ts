import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../../services/state.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Movie } from '../../models/Movie.model';
import { MovieService } from '../../services/movie.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-new-movie',
  templateUrl: './new-movie.component.html',
  styleUrls: ['./new-movie.component.scss']
})
export class NewMovieComponent implements OnInit, OnDestroy {

  public thingForm: FormGroup;
  public loading = false;
  public part: number;
  public userId: string;
  public errorMessage: string;

  private partSub: Subscription;

  constructor(private state: StateService,
              private formBuilder: FormBuilder,
              private stuffService: MovieService,
              private router: Router,
              private auth: AuthService) { }

  ngOnInit() {
    this.state.mode$.next('form');
    this.thingForm = this.formBuilder.group({
      title: [null, Validators.required],
      synopsis: [null, Validators.required],
      acteurs: [0, Validators.required],
      imageUrl: [null, Validators.required]
    });
    this.partSub = this.state.part$.subscribe(
      (part) => {
        this.part = part;
      }
    );
    this.userId = this.part >= 3 ? this.auth.userId : 'userID40282382';
  }

  onSubmit() {
    this.loading = true;
    const thing = new Movie();
    thing.titre = this.thingForm.get('title').value;
    thing.synopsis = this.thingForm.get('synopsis').value;
    thing.acteurs = this.thingForm.get('acteurs').value ;
    thing.imageUrl = this.thingForm.get('imageUrl').value;
    thing._id = new Date().getTime().toString();
    thing.userId = this.userId;
    this.stuffService.createNewThing(thing).then(
      () => {
        this.thingForm.reset();
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
    ).catch(
      (error) => {
        this.loading = false;
        this.errorMessage = error.message;
      }
    );
  }

  ngOnDestroy() {
    this.partSub.unsubscribe();
  }

}
