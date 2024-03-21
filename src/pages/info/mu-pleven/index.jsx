import styles from "@/styles/pages/info/University.module.css";

import Image from "next/image";

import Heading from "@/components/utils/Heading";

import muPlevenLogo from "@/assets/mu-pleven-logo.png";
import SubHeading from "@/components/utils/SubHeading";
import TextContent from "@/components/utils/TextContent";

const name = "Медицински университет - Плевен";

export default function PlevenMu() {
  return (
    <>
      <Heading className={styles.heading}>{name}</Heading>
      <Image
        className={styles.university_img}
        src={muPlevenLogo}
        alt={name}
        priority
      />
      <SubHeading>
        Кандидатстудентският изпит по биология е писмен тест с продължителност 2
        часа.
      </SubHeading>
      <TextContent className={styles.text_content}>
        Тестът съдържа въпроси с различна степен на сложност, върху материала по
        биология от учебниците за задължителна подготовка за 8, 9 и 10 клас и от
        учебниците за профилирана подготовка за 11 и 12 клас.
      </TextContent>
      <ul className={styles.list}>
        <li>
          Първата група въпроси имат по 4 отговора, като само един от тях е
          верен.
        </li>
        <li>
          Втората група въпроси имат по 4 отговора, означени с 1, 2, 3, 4, като
          отговарящият трябва да избере комбинация от верни отговори .
        </li>
        <li>
          Третата група е разнородна и включва въпроси от типа:
          <ul>
            <li>посочете вярното твърдение</li>
            <li>поставете означения на фигурата</li>
            <li>попълнете таблицата</li>
            <li>отбележете функционално свързаните понятия</li>
            <li>посочете грешките в текста и ги поправете</li>
            <li>попълнете пропуснатите думи в текста</li>
          </ul>
          В края на тази група има отворени въпроси, изискващи кратък отговор в
          свободен текст, в обем, съобразен с обема на текста в указания в
          програмата учебник.
        </li>
      </ul>
    </>
  );
}
