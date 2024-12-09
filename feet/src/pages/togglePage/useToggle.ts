import useLocalStorage from 'use-local-storage';

export const useToggle = () => {
  const [isAdvertisementShowing, setAdvertisementShowing] = useLocalStorage(
    'showAdvertisement',
    false,
  );
  const [isAboutUsShowing, setAboutUsShowing] = useLocalStorage(
    'showAboutUs',
    false,
  );

  return {
    isAdvertisementShowing,
    setAdvertisementShowing,
    isAboutUsShowing,
    setAboutUsShowing,
  };
};
