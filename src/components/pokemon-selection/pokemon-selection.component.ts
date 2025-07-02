import {Component, ElementRef, Input, SimpleChanges, ViewChild} from '@angular/core';
import {fromEvent, Observable, take} from "rxjs";
import {StatusService} from "../../services/status.service";
import {PokemonService} from "../../services/pokemon.service";
import {BoxComponent} from "../box/box.component";
import {AsyncPipe} from "@angular/common";
import {OptionSelectorComponent} from "../optionSelector/option-selector.component";

@Component({
    selector: "pokemon-selection",
    templateUrl: "pokemon-selection.component.html",
    styleUrl: "pokemon-selection.styles.scss",
    imports: [
        BoxComponent,
        AsyncPipe,
        OptionSelectorComponent
    ],
    standalone: true
})
export class PokemonSelectionComponent {
    @ViewChild('pokemonAudio') pokemonAudio!: ElementRef<HTMLAudioElement>;

    @Input() amountOfOptions: number = 56;

    boxes = Array(10);
    mp3Music: string = "https://eta.vgmtreasurechest.com/soundtracks/pokemon-yellow-gb/sayitdpg/01_Opening%20%28part%201%29.mp3";
    options$ = this.pokemonService.pokemons$;
    totalCount$: Observable<number> = this.statusService.totalValue$;
    currentBoxIndex$: Observable<number | null> = this.statusService.currentBoxIndex$;
    isLoading$: Observable<boolean> = this.pokemonService.loading;


    constructor(private statusService: StatusService, private pokemonService: PokemonService) {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['amountOfOptions']) this.pokemonService.getPokemonsFromAPI(this.amountOfOptions)
    }

    ngOnInit() {
        fromEvent(document, 'click').subscribe(() => this.playAudio())
    }


    playAudio() {
        try {
            const Audio = this.pokemonAudio.nativeElement;
            Audio.volume = 0.01;
            Audio.play();

        } catch (error) {
            console.error('Error playing audio:', error);
        }
    }

    clear(): void {
        this.statusService.clearAll();
    }

    ngOnDestroy() {
        const audio: any = this.pokemonAudio.nativeElement;
        audio.pause()
    }
}
