import React, { FC, ReactNode, useEffect } from "react";
import { useInView, motion, useAnimate } from "framer-motion";

const Transition: FC<{
    refElement?: any;
    children?: ReactNode;
}> = ({ refElement, children }) => {
    const isInView = useInView(refElement);
    const [introductionElement, animateIntroductionElement] = useAnimate();

    useEffect(() => {
        if (isInView) {
            animateIntroductionElement(
                introductionElement.current,
                {
                    opacity: 1,
                    marginTop: 0,
                },
                {
                    duration: 0.8,
                    delay: 0.5,
                    type: "tween",
                    ease: "easeOut",
                }
            );
        }
    }, [animateIntroductionElement, introductionElement, isInView]);

    return (
        <motion.div
            ref={introductionElement}
            initial={{ marginTop: "2rem", opacity: 0 }}
        >
            {children}
        </motion.div>
    );
};

export default Transition;
