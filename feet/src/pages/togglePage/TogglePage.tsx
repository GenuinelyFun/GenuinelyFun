import { FC } from 'react';
import { useToggle } from './useToggle';

import styles from './TogglePage.module.less';

const TogglePage: FC = () => {
  const {
    isAdvertisementShowing,
    setAdvertisementShowing,
    isAboutUsShowing,
    setAboutUsShowing,
  } = useToggle();
  return (
    <main className={styles.container}>
      <h1>Toggle Page</h1>
      <fieldset>
        <ul>
          <li>
            <label>
              <input
                type={'checkbox'}
                checked={isAdvertisementShowing}
                onChange={() =>
                  setAdvertisementShowing(!isAdvertisementShowing)
                }
              />
              Show Advertisement card
            </label>
          </li>
          <li>
            <label>
              <input
                type={'checkbox'}
                checked={isAboutUsShowing}
                onChange={() => setAboutUsShowing(!isAboutUsShowing)}
              />
              Show About Us card
            </label>
          </li>
        </ul>
      </fieldset>
    </main>
  );
};

export default TogglePage;
