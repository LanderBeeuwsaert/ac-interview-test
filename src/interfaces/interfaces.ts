export interface Option {
    index: number;
    imageUrl: string;
    pokemon_name: string;
    soundUrl: string;
    value: number;
    pokemon_type: string[];
}

export interface AppState {
    selected_optoins: Option [];
    current_box_index: number;
}
