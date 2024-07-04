import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, delay, map, mergeMap, of, switchMap } from "rxjs";
import { addUserListItem, addUserListItemError, addUserListItemSuccess, loadUserList, loadUserListError, loadUserListSuccess, removeUserListItem, removeUserListItemError, removeUserListItemSuccess, updateUserListItem, updateUserListItemError, updateUserListItemSuccess } from "./user.actions";
import { UserListService } from "../user-list.service";

export const loadUserListEffect = createEffect((
    actions$ = inject(Actions),
    service = inject(UserListService)
) => actions$.pipe(
    ofType(loadUserList),
    switchMap(() =>
        service.getUsers().pipe(
            map(entities => loadUserListSuccess({ entities })),
            catchError(() => of(loadUserListError()))
        )
    )
), { functional: true })

export const addUserListEffect = createEffect((
    actions$ = inject(Actions),
    service = inject(UserListService)
) => actions$.pipe(
    ofType(addUserListItem),
    mergeMap(({ item }) =>
        service.addUser(item).pipe(
            map(itemCreated => addUserListItemSuccess({ item: itemCreated })),
            catchError(() => of(addUserListItemError()))
        )
    )
), { functional: true })

export const removeUserListItemEffect = createEffect((
    actions$ = inject(Actions),
    service = inject(UserListService)
) => actions$.pipe(
    ofType(removeUserListItem),
    delay(2_000),
    mergeMap(({ item }) =>
        service.removeUser(item).pipe(
            map(() => removeUserListItemSuccess()),
            catchError(() => of(removeUserListItemError({ item })))
        )
    )
), { functional: true });

export const updateUserListItemEffect = createEffect((
    actions$ = inject(Actions),
    service = inject(UserListService)
) => actions$.pipe(
    ofType(updateUserListItem),
    mergeMap(({ item }) =>
        service.updateUser(item).pipe(
            map(() => updateUserListItemSuccess()),
            catchError(() => of(updateUserListItemError({ item })))
        )
    )
), { functional: true });