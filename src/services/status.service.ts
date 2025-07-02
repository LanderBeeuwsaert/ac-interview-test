import {BehaviorSubject, map, Observable} from 'rxjs';
import {AppState, Option} from '../interfaces/interfaces';
import {Injectable} from "@angular/core";


@Injectable({providedIn: 'root'})
export class StatusService {

    // @ts-ignore
    private readonly INITIAL_STATE: AppState = {
        selected_optoins: Array(),
    };

    private readonly _state$: BehaviorSubject<AppState> = new BehaviorSubject<AppState>(this.loadState());
    state$: Observable<AppState> = this._state$.asObservable()
    selectedOptions$: Observable<(Option | null)[]> = this._state$.pipe(map(state => state.selected_optoins));
    currentBoxIndex$: Observable<number> = this._state$.pipe(map(state => state.current_box_index));

    private readonly _totalValue$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    totalValue$ = this._totalValue$.asObservable();

    constructor() {
        this._state$.subscribe(state => {
            this.saveState(state);
            this.calculateTotalValue(state);
        });
    }

    calculateTotalValue(state: AppState) {
        const total: number = state.selected_optoins.reduce((total, selectedOption) => total + (selectedOption?.value || 0), 0);
        this._totalValue$.next(total);
    }

    private loadState(): AppState {
        const saved = localStorage.getItem('boxStates');
        return saved ? {...this.INITIAL_STATE, ...JSON.parse(saved)} : this.INITIAL_STATE;
    }

    selectBox(index: number): void {
        this._state$.next({...this._state$.value, current_box_index: index});
    }

    private saveState(state: AppState): void {
        localStorage.setItem('boxState', JSON.stringify(state));
    }


    selectOption(option: Option): void {
        let currentState = this._state$.value;
        const currentIndex: number = currentState.current_box_index;

        if (currentState.current_box_index == null) return;

        const newOptions = [...currentState.selected_optoins];
        newOptions[currentState.current_box_index] = option;


        let nextIndex;

        if (currentState.current_box_index < 9) {
            nextIndex = currentState.current_box_index + 1;
        } else if (currentState.current_box_index === 9) {
            nextIndex = currentState['current_box_index'];
        } else {
            nextIndex = null;
        }

        this._state$.next({
            ...currentState,
            selected_optoins: newOptions,
            current_box_index: nextIndex as number,
        });
    }

    clearAll(): void {
        this._state$.next(this.INITIAL_STATE);
    }

}
