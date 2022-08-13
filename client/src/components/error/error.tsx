export const ErrorComponent = ({error}: {error: Error | string}) => {

    if(error instanceof Error) return <>{error.message}</>


    return <>
    {error}
    <a href="/" >Перейти на главную</a>
    </>

}