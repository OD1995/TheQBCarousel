// import { useRef, useEffect } from "react";
import { useSpring, animated } from "react-spring";
// import SquareLogo from "../../../public/tqbc_logos/square-logo.png";

export const TQBCLoading = () => {

  
    const styles = useSpring({
        loop: true,
        from: { rotateZ: 0 },
        to: { rotateZ: 360 },
        config: {
            duration: 2000
        }
    });
  
    return (
        <div id="tqbc-loading-parent">
            <animated.img
                src={window.location.origin + '/tqbc_logos/square-logo.png'}
                style={{
                    width: 80,
                    height: 80,
                    // backgroundColor: "green",
                    // borderRadius: 16,
                    // boxShadow: "rgb(0,0,0,0.44) 0px 5px 5px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "green",
                    marginBottom: "2%",
                    ...styles,
                }}
            />
            <h5>
                Loading..
            </h5>
        </div>
    );
};