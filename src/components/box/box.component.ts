import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {StatusService} from '../../services/status.service';
import {AsyncPipe, CommonModule} from '@angular/common';
import {Observable, combineLatest, map} from 'rxjs';
import {AppState, Option} from '../../interfaces/interfaces';

@Component({
    selector: 'app-box',
    standalone: true,
    imports: [AsyncPipe],
    templateUrl: './box.component.html',
    styleUrls: ['./box.styles.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoxComponent {
    @Input() boxIndex!: number;

    appStateObs: Observable<AppState> = this.service.state$;

    constructor(private service: StatusService) {
    }

    selectBox(): void {
        console.log("click box Nº", this.boxIndex);
        this.service.selectBox(this.boxIndex);
    }
}
