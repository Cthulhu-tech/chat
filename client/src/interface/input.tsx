export interface IInput {

    value:string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;

}

export type formResponse = {

    message?: string;
    error?: string;
    auth?: boolean;
    login?: string;
    accesstoken?: string;

}

export type inputData = {

    login?: string;
    password?: string;

}
