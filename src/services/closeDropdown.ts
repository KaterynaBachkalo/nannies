import { useEffect, RefObject } from "react";

type CloseFunction = (value: boolean) => void;

const useCloseDropdown = (
  func: CloseFunction,
  myRef: RefObject<HTMLElement>,
  ref?: RefObject<HTMLElement>
) => {
  useEffect(() => {
    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.code === "Escape") {
        func(false);
      }
    };

    const handleClose = (event: MouseEvent) => {
      if (
        myRef.current &&
        !myRef.current.contains(event.target as Node) &&
        ref?.current &&
        !ref?.current.contains(event.target as Node)
      ) {
        func(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClose);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClose);
    };
  }, [func, myRef, ref]);
};

export default useCloseDropdown;
