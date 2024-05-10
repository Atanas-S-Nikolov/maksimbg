import styles from "@/styles/pages/info/University.module.css";

import Image from "next/image";

import Heading from "@/components/utils/Heading";
import TextContent from "@/components/utils/TextContent";

import suLogo from "@/assets/info/su-logo.png";
import SubHeading from "@/components/utils/SubHeading";
import AccentText from "@/components/utils/AccentText";

const name = "Софийски университет";

export default function SofiaUniversity() {
  return (
    <>
      <Heading className={styles.heading}>{name}</Heading>
      <Image
        className={styles.university_img}
        src={suLogo}
        alt={name}
        priority
      />
      <SubHeading>
        Кандидатстудентският изпит по биология включва два компонента:
      </SubHeading>
      <TextContent className={styles.text_content}>
        <AccentText>Компонент 1</AccentText> съдържа тест от 60 тестови задачи
        по биология <br />
        <br /> <AccentText>Компонент 2</AccentText> е задължителен само за
        кандидатите за специалност Медицина. Изисква се разработване на тема от
        учебния материал от 8., 9. и 10. клас. За успешно полагане на този
        компонент се приемат само кандидат-студентите, получили резултат
        &quot;ДА&quot;, т. е. темата не се оценява с оценка.
      </TextContent>
      <TextContent className={styles.text_content}>
        С оценката от изпита по биология или с оценката от ДЗИ по биология
        можете да кандидатствате за специалностите &quot;Медицинска сестра&quot;
        и &quot;Медицинска рехабилитация и ерготерапия&quot;.
      </TextContent>
    </>
  );
}
