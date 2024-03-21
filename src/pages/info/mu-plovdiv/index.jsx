import styles from "@/styles/pages/info/University.module.css";

import Image from "next/image";

import Heading from "@/components/utils/Heading";

import muPlovdivLogo from "@/assets/mu-plovdiv-logo.svg";
import SubHeading from "@/components/utils/SubHeading";
import TextContent from "@/components/utils/TextContent";

const name = "Медицински университет - Пловдив";

export default function PlovdivMU() {
  return (
    <>
      <Heading className={styles.heading}>{name}</Heading>
      <Image
        className={`${styles.university_img} ${styles.mu_plovdiv_img}`}
        src={muPlovdivLogo}
        alt={name}
        priority
      />
      <SubHeading>
        Конкурсният изпит по биология е писмен и се провежда в продължение на
        два часа.
      </SubHeading>
      <TextContent className={styles.text_content}>
        За това време кандидат-студентите решават тест върху материала от 8, 9 и
        10 клас. Тестът включва 8 типови задачи по подобие на тези в сборниците
        с тестове по биология за кандидат-студенти, издание на МУ-Пловдив.
        Тестът е изцяло съобразен с учебния материал за общообразователна
        подготовка в първо ниво на гимназиално обучение и включва избрани теми
        от профилираната подготовка.
      </TextContent>
      <TextContent className={styles.text_content}>
        В писмения изпит трябва да личи умението на кандидат-студента да си
        служи свободно с учебния материал, да обяснява задълбочено и вярно
        включените факти, явления и закономерности и добра писмена, и езикова
        култура.
      </TextContent>
    </>
  );
}
