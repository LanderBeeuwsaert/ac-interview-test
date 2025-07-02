import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, catchError, forkJoin, map, Observable, of, ReplaySubject, switchMap, timer,} from 'rxjs';
import {Option} from '../interfaces/interfaces';


@Injectable({providedIn: 'root'})
export class PokemonService {
    private loadingState$ = new BehaviorSubject<boolean>(false);
    public loading = this.loadingState$.asObservable();
    private readonly _pokemons$ = new ReplaySubject<Option[]>(1);
    public pokemons$ = this._pokemons$.asObservable()

    private readonly API_URL = 'https://pokeapi.co/api/v2/pokemon';

    constructor(private http: HttpClient) {
    }

    getPokemonsFromAPI(limit: number) {
        // Load the Pokémon from the API and refresh every ten minute
        timer(0, 10 * 60 * 1000).pipe(switchMap(() =>
            this.http.get<any>(`${this.API_URL}?limit=${limit}`)
        ))
            .pipe(
                map(response => {
                    this.loadingState$.next(true);
                    return response.results;
                }),
                switchMap(pokemons =>
                    forkJoin(pokemons.map((pokemon: any) =>
                        this.getPokemonDetails(pokemon.url)
                    ))
                ),

                map((details: any): Option[] => details.map((d: any, index: number) => {
                    return {
                        index: index + 1,
                        pokemon_name: d.name,
                        imageUrl: d.sprites.other['official-artwork'].front_default,
                        soundUrl: d.cries?.latest || d.cries?.legacy,
                        value: (index + 1) / 10,
                        pokemon_type: d.types.map((t: any) => t.type.name),
                        id: d.id
                    } as Option;
                }).sort(() => Math.random() - Math.random())),


                catchError(error => {
                    console.error('Error loading pokemon', error);
                    return of([]);
                }),
            ).subscribe(pokemons => {
            this.loadingState$.next(false);
            this._pokemons$.next(pokemons)
        });
    }

    private getPokemonDetails(url: string): Observable<any> {
        return this.http.get(url);
    }
}
