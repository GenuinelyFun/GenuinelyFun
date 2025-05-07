const CheckmarkIcon = (props: Record<string, string>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="#fff"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="#fff"
      d="M19 7.342a1 1 0 0 0-1.414 0l-7.245 7.245a1 1 0 0 1-1.415 0l-2.54-2.541A1 1 0 0 0 4.97 13.46L7.518 16a3 3 0 0 0 4.24-.003L19 8.757a1 1 0 0 0 0-1.415Z"
    />
  </svg>
);
export default CheckmarkIcon;
