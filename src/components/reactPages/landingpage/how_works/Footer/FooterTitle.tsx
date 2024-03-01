import React, { FC } from "react";
import Image from "next/image";

const FooterTitle: FC = () => {
    return (
        <div className="flex justify-center">
            <div className="mr-2 mt-2">© Housewell 2023. All Rights Reserved.</div>
            <Image
                src={"/landing/house.jpg"}
                width={30}
                height={30}
                alt="house"
            />
        </div>
    );
};

export default FooterTitle;
