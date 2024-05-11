import styles from "@/styles/pages/level-test/LevelTest.module.css";

import Button from "@mui/material/Button";

import Heading from "@/components/utils/Heading";
import Question from "@/components/utils/Question";

import { QUESTIONS } from "@/constants/LevelTestQuestions";
import { useMediaQuery } from "@mui/material";

export default function LevelTest() {
  const mobile = useMediaQuery("(max-width: 425px)", { defaultMatches: false });
  const btnSize = mobile ? "small" : "medium";

  return (
    <>
      <Heading className={styles.title}>Тест за определяне на нивото</Heading>
      <section className={styles.test_section}>
        {QUESTIONS.map((question, index) => (
          <Question
            key={index}
            question={question}
            questionNumber={index + 1}
          />
        ))}
      </section>
      <Button
        className={styles.submit_button}
        variant="contained"
        color="secondary"
        size={btnSize}
      >
        Приключи теста
      </Button>
    </>
  );
}
