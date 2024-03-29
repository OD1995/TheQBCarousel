import { TwitterMentionButton } from "react-twitter-embed";

export const SocialMediaRequestOld = () => {
    return (
        <div
            id="social-media-request"
        >
            <TwitterMentionButton
                screenName="TheQBCarousel"
                options={{
                    size: 'large',
                    text: 'Please add ...... to the list of options'
                }}
                placeholder='Loading'
                id="social-media-twitter"
            />
            <h6
                id="social-media-text"
                className="display-linebreak"
            >
                If you can't see a player in the dropdown,{"\n"} make a request on Twitter or Reddit
            </h6>
            <a
                id="social-media-reddit"
                href='https://www.reddit.com/message/compose/?to=TheQBCarousel&subject=New%20Player%20Request&message=Please%20add%20......%20to%20the%20list%20of%20options'
                target="_blank"
                rel="noopener noreferrer"
            >
                <img
                    id='reddit-logo'
                    src={window.location.origin + "/other_logos/reddit.png"}
                />
            </a>
        </div>
    )
}