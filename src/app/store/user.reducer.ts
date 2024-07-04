import { createReducer, on } from "@ngrx/store";
import { UserListState } from "./user.state";
import { addUserListItem, addUserListItemError, addUserListItemSuccess, loadUserList, loadUserListError, loadUserListSuccess, removeUserListItem, removeUserListItemError, removeUserListItemSuccess, updateUserListItem, updateUserListItemError, updateUserListItemSuccess } from "./user.actions";

export const initialState: UserListState = {
    entities: [],
    isLoading: false,
    isSaving: false,
    isDeleting: false,
    isUpdating: false,
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
        entities: state.entities.filter(user => user.id !== item.id),
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
    })),
    on(updateUserListItem, (state, { item }) => {
        const index = state.entities.findIndex(existingItem => existingItem.id === item.id);

        if (index === -1) {
            return state;
        }

        const updatedEntities = [...state.entities];
        updatedEntities[index] = { ...updatedEntities[index], ...item };

        return {
            ...state,
            entities: updatedEntities,
            isUpdating: true
        };
    }),
    on(updateUserListItemSuccess, (state) => ({
        ...state,
        isUpdating: false
    })),
    on(updateUserListItemError, (state, { item }) => ({
        ...state,
        entities: [...state.entities, item],
        isUpdating: false
    })),
)