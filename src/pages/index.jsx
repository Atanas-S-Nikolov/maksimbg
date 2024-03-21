import styles from "@/styles/pages/Home.module.css";

import Image from "next/image";

import Button from '@mui/material/Button';

import Heading from "@/components/utils/Heading";
import TextContent from "@/components/utils/TextContent";
import SubHeading from "@/components/utils/SubHeading";

import biologyBoard from "@/assets/biology-board.jpg";
import { SITE_NAME } from "@/constants/global";

export default function Home() {
  return (
    <>
      <section className={styles.container}>
        <div>
          <Heading className={styles.greeting}>Добре дошли, кандидат-студенти, <br/> Името ми е Максим Аспарухов – основател на сайта maksim.bg.</Heading>
          <TextContent className={styles.description}>
             През 2020 г. завърших  бакалавър по Молекулярна биология 
            в СУ &quot;Св. Климент Охридски&quot; с допълнителна квалификация за учител по биология. Две години по-късно успешно защитих магистратура като микробиолог. 
            Занимавам се с подготовката на кандидат-студенти по специалностите &quot;Медицина&quot;, &quot;Дентална медицина&quot; и &quot;Фармация&quot;.
            <br/>
            Сайтът е комуникацията, чрез която ще получавам Вашата обратна връзка, а материалите, които качвам в него, 
            ще ви помогнат да бъдете по-уверени и сигурни в успеха си!
          </TextContent>
        </div>
        <Image
          className={styles.board_img}
          src={biologyBoard}
          alt="maksim.bg"
          title={SITE_NAME}
        />
      </section>
      <section className={styles.level_test_section}>
        <SubHeading className={styles.level_test_text}>
          Преди да започнете планирането на своята подготовка стъпка по стъпка, нека направим тест за определяне на нивото.
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
    </>
  );
}
