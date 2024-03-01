import React, { FC, ReactNode, useEffect, useState, useRef } from "react";

const SelectDropdown: FC<{ children?: ReactNode; defaultString?: string; style?: React.CSSProperties }> = ({
    children,
    defaultString,
    style,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <div
            ref={dropdownRef}
            className="dropdown rounded-lg border-2 border-[#E0650D] text-[#E0650D] font-mint text-xl cursor-pointer"
            onClick={toggleDropdown}
            style={style}
        >
            <div className="dropbtn px-4 py-2 flex justify-between items-center w-full">
                <span className="flex-1 text-center">{defaultString}</span>
                <div className="bg-[url('/temp/caret.svg')] bg-no-repeat bg-[length:100%_100%] h-3 w-3 mt-1" />
            </div>

            <div className="w-full flex justify-center">
                <div
                    className={`dropdown-content ${isOpen ? 'show' : 'hidden'} absolute bg-[#fff] rounded-lg max-md:w-[85%] max-sm:w-[80%] max-[430px]:w-[75%] max-[320px]:w-[70%] max-[270px]:w-[60%] max-[200px]:w-auto max-h-[300px] overflow-y-auto`}
                >
                    {children}
                </div>
            </div>
        </div>
    );
};

export default SelectDropdown;
