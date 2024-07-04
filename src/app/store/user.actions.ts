import { createAction, props } from "@ngrx/store";
import { UserListCreateBase, UserListItem } from "./user.state";

export const loadUserList = createAction(
    '[User List] Load User List'
);
export const loadUserListSuccess = createAction(
    '[User List Effects] Load User List Success',
    props<{ entities: UserListItem[] }>()
);
export const loadUserListError = createAction(
    '[User List Effects] Load User List Error',
);

export const addUserListItem = createAction(
    '[Add User] Add User List Item',
    props<{ item: UserListCreateBase }>()
);

export const addUserListItemSuccess = createAction(
    '[User List Effects] Add User List Item Success',
    props<{ item: UserListItem }>()
);

export const addUserListItemError = createAction(
    '[User List Effects] Add User List Item Error',
);

export const removeUserListItem = createAction(
    '[User List] Remove User List Item',
    props<{ item: UserListItem }>()
);

export const removeUserListItemSuccess = createAction(
    '[User List Effects] Remove User List Item Success',
);

export const removeUserListItemError = createAction(
    '[User List Effects] Remove User List Item Error',
    props<{ item: UserListItem }>()
);

export const updateUserListItem = createAction(
    '[User List] Update User List Item',
    props<{ item: UserListItem }>()
);

export const updateUserListItemSuccess = createAction(
    '[User List Effects] Update User List Item Success',
);

export const updateUserListItemError = createAction(
    '[User List Effects] Update User List Item Error',
    props<{ item: UserListItem }>()
);