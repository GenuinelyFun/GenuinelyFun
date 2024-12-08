import { FC, useEffect } from 'react';
import classNames from 'classnames';
import { useLanguageContext } from '../../utils/LanguageProvider';
import nghi from '../../assets/images/nghi_1276x1276.jpg';
import { nghiLinks } from '../journalpage/AuthorCard';
import { Darkmode, useDarkmodeContext } from '../../utils/DarkmodeProvider';
import styles from './ArthurPage.module.less';
import { useLocation } from 'react-router-dom';

const NghiPage: FC = () => {
  const { translate } = useLanguageContext();
  const { theme } = useDarkmodeContext();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <img
          src={nghi}
          alt={translate('author-card.nghi.aria')}
          className={styles.profileImage}
        />
        <div className={styles.headerContent}>
          <h1 className={styles.profileText}>
            {translate('author-card.nghi.title')},
          </h1>
          <div className={styles.socialMedia}>
            {Object.keys(nghiLinks).map((key) => {
              const link = nghiLinks[key];
              return (
                <a
                  key={key}
                  href={link.url}
                  className={classNames({
                    [styles.lightSocialLinks]: theme === Darkmode.Light,
                  })}
                >
                  {link.icon}
                </a>
              );
            })}
          </div>
        </div>
      </div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec efficitur
        tellus nec imperdiet fermentum. Donec nec dictum arcu. Curabitur in
        maximus lacus. Donec venenatis volutpat leo, a tristique turpis cursus
        eget. Maecenas fermentum porttitor velit, tempor vehicula magna
        pellentesque eu. Nullam blandit faucibus nisi sit amet euismod. Ut
        semper euismod risus vel mattis. Aenean mi lectus, fringilla et magna
        vitae, volutpat fringilla nulla. Aenean condimentum quam sed metus
        volutpat facilisis. Praesent vel nulla tristique massa fringilla
        convallis eu a sapien. Sed volutpat mauris in est ornare, sed gravida
        dolor volutpat. Suspendisse potenti. Integer luctus ipsum in augue
        efficitur, eu pellentesque arcu feugiat. Pellentesque tristique sed
        felis at mattis. Quisque vitae lorem a magna efficitur sagittis in a
        est. Nunc dignissim quam nec vestibulum auctor.
      </p>
      <p>
        Sed porta nulla vel eros lobortis auctor. Phasellus feugiat mauris sit
        amet tincidunt bibendum. Suspendisse egestas tortor in massa lacinia
        dignissim. Nullam vitae tortor elementum, feugiat sapien vitae, faucibus
        sem. Praesent eu nulla tristique, scelerisque leo et, sollicitudin enim.
        Sed pretium a metus id convallis. Curabitur vel ex sit amet ex viverra
        sodales. Phasellus rutrum sollicitudin quam, quis tempus nulla congue
        ac. Aenean porta ornare diam, eu vulputate nisi bibendum id. Vestibulum
        auctor turpis vel nunc dapibus, id porttitor ipsum efficitur. Morbi
        ipsum elit, placerat vitae sapien quis, interdum maximus ante. Aliquam
        elementum, magna id tincidunt laoreet, risus lectus porta lorem, ac
        malesuada sem turpis sit amet lacus.
      </p>
      <h3>Subheading jeg er så kul hallo hei</h3>
      <p>
        Mauris vulputate tincidunt augue sit amet placerat. Fusce eros urna,
        bibendum nec pretium in, aliquam in enim. Aliquam erat volutpat. Nam
        pharetra mauris non urna feugiat venenatis. Aenean in felis quis velit
        faucibus dapibus. Nulla in lacus ac odio ultricies eleifend eget in
        nisi. Duis vulputate, neque finibus ornare interdum, tortor lorem
        dapibus quam, facilisis mollis purus augue nec sem. Duis ex enim,
        fermentum vel viverra nec, pellentesque tristique ante. Sed dictum
        sodales leo, at tempor nulla vehicula vitae. In consequat tincidunt sem,
        in vehicula erat finibus sed. Donec a mauris magna. Fusce dui dolor,
        consequat vitae mollis a, sollicitudin id mauris. Aenean in blandit
        magna.
      </p>
      <h3>Siste få ord fordi jeg har mye å siiiiiiiiiiiiiiiiiiiiiiiiii</h3>
      <p>
        Phasellus eu erat eu lacus tristique varius. Donec pulvinar sem augue,
        sit amet pretium mi auctor finibus. Mauris id purus vel nibh gravida
        cursus id vel lorem. Etiam nibh ante, rhoncus nec tristique quis, porta
        ultricies justo. Aliquam ullamcorper eros at pulvinar maximus. Sed
        blandit sagittis urna eu mollis. Nulla sit amet quam eget ligula semper
        dignissim quis faucibus dolor. Praesent eu ex turpis. Phasellus ac
        condimentum est.
      </p>
      <p>
        Sed nec urna in ex accumsan accumsan nec sit amet ante. Etiam nisl
        velit, ultricies sit amet lorem in, aliquam dapibus lacus. Vivamus
        facilisis congue consequat. Duis libero tellus, dignissim at cursus
        tincidunt, tincidunt et est. Suspendisse vitae magna a diam lacinia
        fermentum. Cras at ipsum eget velit finibus aliquet. Maecenas at leo
        pretium, accumsan libero et, varius ipsum. Cras eu nulla et orci
        vehicula commodo. Quisque dignissim lacinia sapien, nec sodales justo
        vulputate sed. Curabitur metus libero, congue et mi at, ullamcorper
        ornare magna. Vestibulum et justo orci. Sed vestibulum varius mollis.
        Nunc lobortis metus sed velit efficitur volutpat. Nam scelerisque ut sem
        eu consequat. Ut elementum tempor libero.
      </p>
    </main>
  );
};

export default NghiPage;
