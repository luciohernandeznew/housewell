import React, { FC } from "react";

const TypingAnimation: FC<{ className?: string; style?: object }> = ({
    className,
    style,
}) => {
    return (
        <>
            <div id="wave" className={className} style={style}>
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
            </div>
        </>
    );
};

export default TypingAnimation;
