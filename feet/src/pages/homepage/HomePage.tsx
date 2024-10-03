import { FC } from 'react';
import image from '../../assets/icons/image_test_560x560.png';
import codingIcon from '../../assets/icons/lightbulb_code.svg';
import websiteIcon from '../../assets/icons/website.svg';
import { ReactComponent as ToolsIcon } from '../../assets/icons/tools.svg';
import nghi from '../../assets/images/nghi_367x367.jpg';
import arthur from '../../assets/images/arthur_800x800.jpg';
import GenericButton from '../../components/GenericButton';
import Card, { IconPosition } from './Card';
import styles from './HomePage.module.less';
import classNames from 'classnames';

const HomePage: FC = () => {
  return (
    <main>
      <section className={styles.heroSection}>
        <img
          src={codingIcon}
          alt="Coding Icon"
          className={styles.heroSectionIconLeft}
        />
        <div>
          <h1>
            Where your <span>i</span>deas come to life
          </h1>
          <p>We turn your ideas into reality with thoughtful coding.</p>
        </div>
        <img
          src={websiteIcon}
          alt="Website Icon"
          className={styles.heroSectionIconRight}
        />
      </section>
      <div className={styles.mainSection}>
        <Card
          icon={
            <img
              src={nghi}
              alt="A picture of Nghi"
              className={styles.genericImage}
            />
          }
          iconPosition={IconPosition.LEFT}
        >
          <div className={styles.cardContent}>
            <h2>Nghi</h2>
            <p>
              A full stack developer. Passionate about design, she types a quick
              90 words per minute, she can program as fast as the speed of
              light! (ahem…not really). She’s always dressed in stylish outfits
              that reflect her cool, modern vibe.
            </p>
          </div>
        </Card>

        <Card
          icon={
            <img
              src={arthur}
              alt="A picture of Arthur"
              className={styles.genericImage}
            />
          }
          iconPosition={IconPosition.RIGHT}
        >
          <div className={styles.cardContent}>
            <h2>Arthur</h2>
            <p>
              By day, I'm a field technician, but by night (and occasionally on
              lunch breaks), I moonlight as a full-stack developer. As a
              freelancer, I love creating smart solutions and tools that help
              people get better results with less effort—and more importantly,
              less time. Oh, and I also build websites. Because, why not?
            </p>
          </div>
        </Card>

        <Card
          className={styles.mainSectionInfoBox}
          icon={<ToolsIcon className={styles.icon} />}
          iconPosition={IconPosition.LEFT}
        >
          <div className={classNames(styles.cardContent, styles.mainContent)}>
            <h2>
              We make your <span>i</span>dea to reality
            </h2>
            <p>
              Your digital presence is key to making a great first impression.
              Whether you need an engaging platform or effective tools to boost
              productivity, we deliver modern solutions that stand out and work
              seamlessly.
            </p>
            <GenericButton
              onClick={() => console.log('I DO NOTHING YET TODO TODO TODO')}
              buttonText={"Click here, and we'll make it happen"}
              invert={true}
            />
          </div>
        </Card>
        <Card
          icon={
            <img
              src={image}
              alt="A test image"
              className={styles.genericImage}
            />
          }
          iconPosition={IconPosition.RIGHT}
        >
          <div className={styles.cardContent}>
            <h2>Our footsteps</h2>
            <p>
              We create stunning, high-converting websites, then build highly
              targeted landing pages that drive focused traffic straight to you.
              After that, we roll up our sleeves and work tirelessly to turn as
              many visitors as possible into paying customers. The result? You
              enjoy a profitable, high-performing website, raking in revenue and
              becoming the talk of your friends and family. It really is that
              simple!
            </p>
          </div>
        </Card>
      </div>
    </main>
  );
};

export default HomePage;
