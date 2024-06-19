import styles from "@/styles/pages/Home.module.css";

import Image from "next/image";

import Button from "@mui/material/Button";

import Heading from "@/components/utils/Heading";
import TextContent from "@/components/utils/TextContent";
import SubHeading from "@/components/utils/SubHeading";
import RatingsSection from "@/components/ratings/RatingsSection";

import Typography from "@mui/material/Typography";

import homePageImage from "@/assets/home-page-image.jpg";
import { SITE_NAME } from "@/constants/global";
import { FEMALE, MALE } from "@/constants/GenderConstants";
import Link from "next/link";

const freepikLink = (
  <Link href="https://freepik.com" target="_blank" referrerPolicy="no-referrer">
    Freepik
  </Link>
);

export async function getServerSideProps() {
  const ratings = [
    {
      name: "Константин Иванов",
      gender: MALE,
      text: 'Благодарение на Максим успях да вляза "Медицина" в "МУ- Варна."!',
      grade: 5,
    },
    {
      name: "Иван Беделев",
      gender: MALE,
      text: "За доста кратко време научих доста от г-н Аспарухов и мога смело да го препоръчам!",
      grade: 5,
    },
    {
      name: "Жени Иванова",
      gender: FEMALE,
      text: "За доста кратко време научих доста от г-н Аспарухов и мога смело да го препоръчам!",
      grade: 4,
    },
  ];

  return { props: { ratings } };
}

export default function Home({ ratings }) {
  return (
    <>
      <section className={styles.container}>
        <div>
          <Heading className={styles.greeting}>
            Добре дошли, кандидат-студенти, <br /> Името ми е Максим Аспарухов –
            основател на сайта maksim.bg.
          </Heading>
          <TextContent className={styles.description}>
            През 2020 г. завърших бакалавър по Молекулярна биология в СУ
            &quot;Св. Климент Охридски&quot; с допълнителна квалификация за
            учител по биология. Две години по-късно успешно защитих магистратура
            като микробиолог. Занимавам се с подготовката на кандидат - студенти
            по специалностите &quot;Медицина&quot;, &quot;Дентална
            медицина&quot; и &quot;Фармация&quot;.
            <br />
            Сайтът е комуникацията, чрез която ще получавам Вашата обратна
            връзка, а материалите, които качвам в него, ще ви помогнат да бъдете
            по-уверени и сигурни в успеха си!
          </TextContent>
        </div>
        <section>
          <Image
            className={styles.home_img}
            src={homePageImage}
            alt="maksim.bg"
            title={SITE_NAME}
            priority
          />
          <Typography
            className={styles.attribution_text}
            color="text.secondary"
            variant="caption"
          >
            Designed by {freepikLink}
          </Typography>
        </section>
      </section>
      <section className={styles.level_test_section}>
        <SubHeading className={styles.level_test_text}>
          Преди да започнете планирането на своята подготовка стъпка по стъпка,
          нека направим тест за определяне на нивото.
        </SubHeading>
        <Button
          href="/level-test"
          variant="contained"
          color="secondary"
          title="Tест за определяне на нивото"
        >
          Направи тест
        </Button>
      </section>
      <RatingsSection ratings={ratings} />
    </>
  );
}
