import styles from "@/styles/pages/info/University.module.css";

import Heading from "@/components/utils/Heading";
import TextContent from "@/components/utils/TextContent";
import Image from "next/image";

import muVarnaLogo from "@/assets/info/mu-varna-logo.png";

const name = "Медицински университет - Варна";

export default function VarnaMU() {
  return (
    <>
      <Heading className={styles.heading}>{name}</Heading>
      <Image
        className={styles.university_img}
        src={muVarnaLogo}
        alt={name}
        priority
      />
      <TextContent className={styles.text_content}>
        Конкурсният изпит по биология в МУ-Варна е писмен и представлява
        решаване на комбинация от тестови въпроси, съобразени с учебния
        материал, изучаван в СОУ по биология и здравно образование в 8, 9, 10,
        11, 12 клас (задължителна и профилирана подготовка). Тестовите въпроси
        са от сборниците с тестови задачи за кандидатстудентски изпит по
        биология върху учебния материал за задължителна подготовка, изучаван в
        8, 9 и 10 клас, издания на МУ-Варна, съответно 2014, 2015 и 2016 година.
      </TextContent>
      <TextContent className={styles.text_content}>
        Комбинацията съдържа въпроси с различна трудност, от пет различни типа:
      </TextContent>
      <ul className={styles.list}>
        <li>
          Първият тип включва затворени въпроси с по 4 отговора, като верният е
          само един.
        </li>
        <li>
          Вторият тип включва затворени въпроси с комбинации от твърдения, като
          комбинацията с верни твърдения е само една.
        </li>
        <li>Третият тип включва поредица от верни и неверни твърдения.</li>
        <li>Четвъртият тип включва попълване на пропуснати термини в текст.</li>
        <li>
          Петият тип включва отговор на кратък въпрос в обем, съобразен с обема
          на текста в указаните основни учебници за подготовка.
        </li>
      </ul>
    </>
  );
}
