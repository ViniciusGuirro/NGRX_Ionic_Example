import { createReducer, on } from "@ngrx/store";
import { UserListState } from "./user.state";
import { addUserListItem, addUserListItemError, addUserListItemSuccess, loadUserList, loadUserListError, loadUserListSuccess, removeUserListItem, removeUserListItemError, removeUserListItemSuccess } from "./user.actions";

export const initialState: UserListState = {
    entities: [],
    isLoading: false,
    isSaving: false,
    isDeleting: false
};

export const userListReducer = createReducer(
    initialState,
    on(loadUserList, (state) => ({
        ...state,
        isLoading: true
    })),
    on(loadUserListSuccess, (state, { entities }) => ({
        ...state,
        entities,
        isLoading: false
    })),
    on(loadUserListError, (state) => ({
        ...state,
        isLoading: false
    })),
    on(addUserListItem, (state) => ({
        ...state,
        isSaving: true
    })),
    on(addUserListItemSuccess, (state, { item }) => ({
        ...state,
        entities: [...state.entities, item],
        isSaving: false
    })),
    on(addUserListItemError, (state) => ({
        ...state,
        isSaving: false
    })),
    on(removeUserListItem, (state, { item }) => ({
        ...state,
        entities: state.entities.filter(i => i.id !== item.id),
        isDeleting: true
    })),
    on(removeUserListItemSuccess, (state) => ({
        ...state,
        isDeleting: false
    })),
    on(removeUserListItemError, (state, { item }) => ({
        ...state,
        entities: [...state.entities, item],
        isDeleting: false
    }))
)