import React from "react";
import { Image } from "@react-pdf/renderer";

type TCheckboxProps = {
	isChecked?: boolean;
}

export const Checkbox = ({isChecked = false}: TCheckboxProps) => {
	return (
		<Image 
			src={isChecked ? 'images/ckeckbox-checked.png' : 'images/ckeckbox.png'} /> 
	)
}