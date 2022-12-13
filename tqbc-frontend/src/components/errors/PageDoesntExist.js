import PlainPageComponent from "../PlainPageComponent"

export const PageDoesntExist = () => {
    return (
        <PlainPageComponent
            title={"The page you tried to navigate to does not exist.."}
        />
    )
}