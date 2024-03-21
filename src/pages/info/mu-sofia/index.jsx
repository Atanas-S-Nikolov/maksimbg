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
      <Heading>{name}</Heading>
      <Image src={muLogo} alt={name} width={300} />
      <SubHeading>
        Кандидат- студентски изпит по биология ще бъде с времетраене 4 часа.
      </SubHeading>
      <TextContent>
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
      <TextContent>
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
      <TextContent>
        Програмата за изпита по биология ще включва материал от задължителната
        подготовка по предмета Биология и здравно образование (материалът от 8,
        9, и 10-ти клас на гимназиите) и материал от профилираната подготовка
        (11 и 12-ти клас). Ще се включат тези раздели от гимназиалната програма,
        които съответстват на особеностите на преподаването в МУ-София.
      </TextContent>
    </>
  );
}
