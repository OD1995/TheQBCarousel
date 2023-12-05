import { TwitterMentionButton } from "react-twitter-embed";

export const SocialMediaRequest = () => {
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
                If you can't see a player in the dropdown,{"\n"} make a request on Twitter
            </h6>
        </div>
    )
}