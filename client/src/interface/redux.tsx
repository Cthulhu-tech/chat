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

export type ReduxStore = {

    jwt: JwtType

}
