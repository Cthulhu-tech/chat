export interface Action<T, P> {
    readonly type: T;
    readonly payload?: P;
}

export type JwtType = {

    user: {

        login: null | string,
        jwt: null | string,

    }

}

export type Room = {

    id: number;
    name: string;
    user: string;

}

export type RoomStore = {

    room: null | Room[]

}

export type ReduxStore = {

    jwt: JwtType;
    room: RoomStore;

}