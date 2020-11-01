import React, { PropsWithChildren, useRef, useState } from 'react';
import { useStyles } from './styles';
import { useClickAwayListener } from '../../hooks';
import { CSSProperties } from '@material-ui/styles';
import clsx from 'clsx';

export interface MenuOption {
  content: JSX.Element;
  disabled?: boolean;
  onClick: () => void;
}
interface Props {
  menuOptions: MenuOption[];
  style?: CSSProperties;
}
export const HelperPopover = (props: PropsWithChildren<Props>) => {
  const { menuOptions, children, style } = props;
  const classes = useStyles();
  const contentRef = useRef(null);
  const menuRef = useRef(null);
  const [show, setShow] = useState<boolean>(false);
  const toggleShow = () => {
    setShow(!show);
  };
  const hideMenu = () => {
    setShow(false);
  };
  const menuEl = menuRef.current;
  const contentEl = contentRef.current;

  const dispanceFromRight = 8; //px
  if (menuEl && contentEl) {
    menuEl.style.display = show ? 'flex' : 'none';
    menuEl.style.top = '0px';
    menuEl.style.left = `${contentEl.clientWidth + dispanceFromRight}px`;
  }

  useClickAwayListener(menuRef, hideMenu);

  return (
    <div
      className={classes.popoverContainer}
      onClick={toggleShow}
      style={style}
    >
      <div ref={contentRef} className={classes.popoverContent}>
        {children}
      </div>
      {menuOptions && menuOptions.length > 0 && (
        <div ref={menuRef} className={classes.menuContainer}>
          {menuOptions.map(option => {
            return (
              <div
                className={clsx(
                  classes.menuItem,
                  option.disabled ? classes.disabled : '',
                )}
                onClick={option.onClick}
              >
                {option.content}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
