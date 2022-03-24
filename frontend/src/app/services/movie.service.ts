import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Movie } from '../models/Movie.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) {}

  private stuff: Movie[] = [
    {
      _id: '324sdfmoih3',
      titre: 'Mon objet',
      synopsis: 'A propos de mon objet',
      imageUrl: 'https://c.pxhere.com/photos/30/d6/photographer_camera_lens_slr_photography_hands-1079029.jpg!d',
      acteurs: 'nadia kamel oana',
      userId: 'will'
    },
    {
      _id: '324sdfmoih4',
      titre: 'Un autre objet',
      synopsis: 'A propos de mon autre objet',
      imageUrl: 'https://www.publicdomainpictures.net/pictures/10000/velka/1536-1249273362hbHb.jpg',
      acteurs: 'nadia kamel oana',
      userId: 'will'
    },
  ];
  public stuff$ = new Subject<Movie[]>();

  getStuff() {
    this.http.get('http://localhost:3000/dtbMovie/movie/').subscribe(
      (stuff: Movie[]) => {
        if (stuff) {
          this.stuff = stuff;
          this.emitStuff();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  emitStuff() {
    this.stuff$.next(this.stuff);
  }

  getThingById(id: string) {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:3000/dtbMovie/movie/' + id).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  createNewThing(thing: Movie) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/dtbMovie/movie', thing).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  createNewThingWithFile(thing: Movie, image: File) {
    return new Promise((resolve, reject) => {
      const thingData = new FormData();
      thingData.append('thing', JSON.stringify(thing));
      thingData.append('image', image, thing.titre);
      this.http.post('http://localhost:3000/dtbMovie/movie/', thingData).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  modifyThing(id: string, thing: Movie) {
    return new Promise((resolve, reject) => {
      this.http.put('http://localhost:3000/dtbMovie/movie/' + id, thing).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  modifyThingWithFile(id: string, thing: Movie, image: File | string) {
    return new Promise((resolve, reject) => {
      let thingData: Movie | FormData;
      if (typeof image === 'string') {
        thing.imageUrl = image;
        thingData = thing;
      } else {
        thingData = new FormData();
        thingData.append('thing', JSON.stringify(thing));
        thingData.append('image', image, thing.titre);
      }
      this.http.put('http://localhost:3000/dtbMovie/movie/' + id, thingData).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  deleteThing(id: string) {
    return new Promise((resolve, reject) => {
      this.http.delete('http://localhost:3000/dtbMovie/movie/' + id).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
}
