import React, { useEffect } from "react";
import { ReactPortal } from "../../utils/Portal";
import { Button } from "../button";
import "./styles.scss";

interface Props {
	children: React.ReactNode;
	isOpen: boolean;
	handleClose: () => void;
}

export const Modal = ({ children, isOpen, handleClose }: Props) => {
	useEffect(() => {
		const closeOnEscapeKey = (e: any) =>
			e.key === "Escape" ? handleClose() : null;
		document.body.addEventListener("keydown", closeOnEscapeKey);
		return () => {
			document.body.removeEventListener("keydown", closeOnEscapeKey);
		};
	}, [handleClose]);

	if (!isOpen) return null;

	return (
		<ReactPortal wrapperId="react-portal-modal-container">
			<div className="modal">
				<Button name="Lukk" onClick={handleClose} />
				<div className="modal-content">{children}</div>
			</div>
		</ReactPortal>
	);
};
