export const PageDoesntExistComponent = () => {
    return (
        <div
            id="page-doesnt-exist-div"
            style={
                {
                    height: "80vh",
                    display:"flex",
                    alignItems: "center",
                    justifyContent: "center"
                }
            }
        >
            <h1>
                The page you tried to navigate to does not exist..
            </h1>
        </div>
    )
}