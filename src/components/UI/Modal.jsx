import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";

export default function Modal({ children, open, className = "", onClose }) {
  const dialogRef = useRef();
  useEffect(() => {
    if (open) {
      return dialogRef.current.showModal();
    }
    return dialogRef.current.close();
  }, [open]);

  return createPortal(
    <dialog ref={dialogRef} className={`modal ${className}`} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}
