import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserListState } from "./user.state";

const getUserListState = createFeatureSelector<UserListState>('userList');

export const getUserList = createSelector(
    getUserListState,
    (state: UserListState) => state?.entities
);

export const getUserListIsLoading = createSelector(
    getUserListState,
    (state: UserListState) => state?.isLoading
);

export const getUserListIsSaving = createSelector(
    getUserListState,
    (state: UserListState) => state?.isSaving
);

export const getUserListIsDeleting = createSelector(
    getUserListState,
    (state: UserListState) => state?.isDeleting
);