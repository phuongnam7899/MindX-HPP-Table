import { PropsWithChildren, useState, useRef } from 'react';
import { useStyles } from './styles';

interface Props {
  title: string | JSX.Element;
}

export const Tooltip = (props: PropsWithChildren<Props>): JSX.Element => {
  const { children, title } = props;
  const classes = useStyles();
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const [show, setShow] = useState<boolean>(false);
  const handleMouseOver = () => {
    setShow(true);
  };
  const handleMouseOut = () => {
    setShow(false);
  };
  const titleEl = titleRef.current;
  const contentEl = contentRef.current;

  const dispanceFromTop = 8; //px
  if (titleEl && contentEl) {
    titleEl.style.display = show ? 'block' : 'none';
    titleEl.style.top = `-${contentEl.clientHeight + dispanceFromTop}px`;
  }
  return (
    <div
      className={classes.tooltipContainer}
      onMouseEnter={handleMouseOver}
      onMouseLeave={handleMouseOut}
    >
      <div ref={contentRef} className={classes.tooltipContent}>
        {children}
      </div>
      {title && (
        <div ref={titleRef} className={classes.tooltipTitle}>
          {title}
        </div>
      )}
    </div>
  );
};
