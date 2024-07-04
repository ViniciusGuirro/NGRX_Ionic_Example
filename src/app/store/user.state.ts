export interface UserListCreateBase {
    name: string;
    age: number;
    genre: string;
    profission: string
}

export interface UserListItem extends UserListCreateBase {
    id: number;
}

export interface UserListState {
    entities: UserListItem[];
    isLoading: boolean;
    isSaving: boolean;
    isDeleting: boolean;
}