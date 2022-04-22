
const PlainPageComponent = (props) => {

    return (
        <div id="plainPage">
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