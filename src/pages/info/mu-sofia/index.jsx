import styles from "@/styles/pages/info/University.module.css";

import Image from "next/image";

import muLogo from "@/assets/mu-logo.png";

import Heading from "@/components/utils/Heading";
import SubHeading from "@/components/utils/SubHeading";
import TextContent from "@/components/utils/TextContent";
import AccentText from "@/components/utils/AccentText";

const name = "Медицински университет - София";

export default function SofiaMU() {
  return (
    <>
      <Heading className={styles.heading}>{name}</Heading>
      <Image
        className={styles.university_img}
        src={muLogo}
        alt={name}
        priority
      />
      <SubHeading>
        Кандидат- студентски изпит по биология ще бъде с времетраене 4 часа.
      </SubHeading>
      <TextContent className={styles.text_content}>
        <AccentText>МОДУЛ 1</AccentText> с продължителност{" "}
        <AccentText>90 минути</AccentText>, който да включва:
      </TextContent>
      <ul className={styles.list}>
        <li>
          20 тестови задачи с един верен отговор или комбинация от повече от
          един верен отговор.
        </li>
        <li>
          2 или 3 отворени въпроса (в зависимост от необходимото време за
          отговор), които изискват графично представяне на биологични структури
          или процеси чрез схеми, модели и символи;
        </li>
      </ul>
      <TextContent className={styles.text_content}>
        <AccentText>МОДУЛ 2</AccentText> с продължителност{" "}
        <AccentText>150 минути</AccentText>, който да включва:
      </TextContent>
      <ul className={styles.list}>
        <li>
          20 въпроса с отворен отговор, прецизно дефинирани така, че да изискват
          кратък и еднозначен отговор (една дума, няколко думи или едно
          изречение).
        </li>
        <li>4 отворени въпроса, които изискват разширен отговор.</li>
      </ul>
      <TextContent className={styles.text_content}>
        Програмата за изпита по биология ще включва материал от задължителната
        подготовка по предмета Биология и здравно образование (материалът от 8,
        9, и 10-ти клас на гимназиите) и материал от профилираната подготовка
        (11 и 12-ти клас). Ще се включат тези раздели от гимназиалната програма,
        които съответстват на особеностите на преподаването в МУ-София.
      </TextContent>
    </>
  );
}
