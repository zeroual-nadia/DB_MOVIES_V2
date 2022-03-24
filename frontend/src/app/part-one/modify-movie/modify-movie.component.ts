import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StateService } from '../../services/state.service';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/Movie.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modify-thing',
  templateUrl: './modify-movie.component.html',
  styleUrls: ['./modify-movie.component.scss']
})
export class ModifyMovieComponent implements OnInit {

  thing: Movie;
  thingForm: FormGroup;
  loading = false;
  errorMessage: string;
  part: number;

  private partSub: Subscription;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private state: StateService,
              private stuffService: MovieService) { }

  ngOnInit() {
    this.loading = true;
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
    this.state.mode$.next('form');
    this.route.params.subscribe(
      (params) => {
        this.stuffService.getThingById(params.id).then(
          (thing: Movie) => {
            this.thing = thing;
            this.thingForm.get('title').setValue(this.thing.titre);
            this.thingForm.get('synopsis').setValue(this.thing.synopsis);
            this.thingForm.get('acteurs').setValue(this.thing.acteurs);
            this.thingForm.get('imageUrl').setValue(this.thing.imageUrl);
            this.loading = false;
          }
        );
      }
    );
  }

  onSubmit() {
    this.loading = true;
    const thing = new Movie();
    thing.titre = this.thingForm.get('title').value;
    thing.synopsis = this.thingForm.get('synopsis').value;
    thing.acteurs = this.thingForm.get('acteurs').value ;
    thing.imageUrl = this.thingForm.get('imageUrl').value;
    thing._id = new Date().getTime().toString();
    thing.userId = this.thing.userId;
    this.stuffService.modifyThing(this.thing._id, thing).then(
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
      },
      (error) => {
        this.loading = false;
        this.errorMessage = error.message;
      }
    );
  }

}
