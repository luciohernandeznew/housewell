import React from "react";
import Switch from "react-switch";
import {colors} from "../../styles/oldColors";
function SwitchButton({checked, setChecked} : {checked: boolean, setChecked: () => void}) {
    return (
        <Switch
            onChange={() => setChecked()} checked={checked}
            offColor={colors.gray100}
            offHandleColor={colors.typographyBlack}
            onColor={colors.typographyBlack}
            onHandleColor={colors.background}
            handleDiameter={14}
            uncheckedIcon={false}
            checkedIcon={false}
            width={36}
            height={18}
            activeBoxShadow={"none"}
        />
    );
}

export default SwitchButton;