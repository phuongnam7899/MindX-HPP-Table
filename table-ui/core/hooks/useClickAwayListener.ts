import { useEffect } from 'react';

export function useClickAwayListener(
  ref: React.MutableRefObject<HTMLElement>,
  onClickAway: () => void,
): void {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickAway();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
}
