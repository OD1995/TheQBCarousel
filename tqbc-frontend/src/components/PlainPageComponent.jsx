
const PlainPageComponent = (props) => {

    return (
        <div id="plain-page">
            <h3>
                {props.title}
            </h3>
            <p>
                {props.paragraph}
            </p>
        </div>
    )
}

export default PlainPageComponent;