import {ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {bootstrapApplication} from '@angular/platform-browser';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";
import {About} from "./components/about/about.component";
import {PokemonSelectionComponent} from "./components/pokemon-selection/pokemon-selection.component";

@Component({
    selector: 'app-root',
    imports: [CommonModule, FormsModule, About, PokemonSelectionComponent],
    templateUrl: './app.component.html',
    styleUrls: ['./global_styles.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
    currentPage: 'selection' | 'about' = "selection";
    amountOfOptions: number = 56;

    constructor() {
    }
}

bootstrapApplication(App, {
    providers: [
        provideHttpClient(withInterceptorsFromDi())
    ]
});
