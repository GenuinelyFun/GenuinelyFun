import { ComponentProps, createElement, FC, useEffect, useRef } from 'react';
import { useLocation } from 'react-router';

interface PageHeadingProps
  extends ComponentProps<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

const PageHeading: FC<PageHeadingProps> = ({
  level = 1,
  className,
  children,
  ...props
}) => {
  const location = useLocation();
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (location.state?.prevPage !== undefined && ref.current !== null) {
      ref.current.focus();
    }
    window.history.replaceState({}, '');
  }, []);

  return createElement(
    `h${level}`,
    { ref, className, tabIndex: -1, ...props },
    children,
  );
};

export default PageHeading;
