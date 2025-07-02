import {Component, ChangeDetectionStrategy, Input, ViewChild, ElementRef} from '@angular/core';
import {StatusService} from '../../services/status.service';
import {AsyncPipe, CommonModule} from '@angular/common';
import {Observable, combineLatest, map} from 'rxjs';
import {Option} from '../../interfaces/interfaces';

@Component({
    selector: 'option-selector',
    standalone: true,
    imports: [
        AsyncPipe
    ],
    templateUrl: './option-selector.component.html',
    styleUrls: ['./option-selector.styles.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptionSelectorComponent {
    @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>;

    @Input() option!: Option;

    appState$: Observable<{ option: Option, boxIndex: number }> = this.service.state$.pipe(
        map(({selected_optoins, current_box_index}) => ({
            option: current_box_index != null ? selected_optoins[current_box_index] : null,
            boxIndex: current_box_index,
        }))
    );

    constructor(private service: StatusService) {
    }

    selectOption(option: Option): void {
        this.service.selectOption(option);

        if (this.audioPlayer) {
            let audio = this.audioPlayer.nativeElement
            audio.load();  // Reloads to allow multiple executions
            audio.play().catch(error => console.error("Error playing audio:", error));
            audio.volume = 0.02;
        }
    }
}
