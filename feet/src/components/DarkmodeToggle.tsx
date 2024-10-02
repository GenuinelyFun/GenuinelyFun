import { useDarkmodeContext } from '../utils/DarkmodeProvider';

const DarkmodeToggle = () => {
  const { toggleTheme } = useDarkmodeContext();

  return <button onClick={toggleTheme}>switch theme</button>;
};
export default DarkmodeToggle;
