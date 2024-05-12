import styles from "@/styles/pages/level-test/LevelTest.module.css";

import Button from "@mui/material/Button";

import Heading from "@/components/utils/Heading";
import Question from "@/components/utils/Question";

import { QUESTIONS } from "@/constants/LevelTestQuestions";
import { useMediaQuery } from "@mui/material";
import { useState } from "react";

export default function LevelTest() {
  const [testOver, setTestOver] = useState(false);
  const [answersResults, setAnswersResults] = useState([]);
  const mobile = useMediaQuery("(max-width: 425px)", { defaultMatches: false });
  const btnSize = mobile ? "small" : "medium";

  function handleTestOverClick(event) {
    event.preventDefault();
    setTestOver(true);
  }

  function updateAnswerResults(questionNumber, answerCorrect) {
    setAnswersResults((prevState) => [
      ...prevState,
      { questionNumber, answerCorrect },
    ]);
  }

  return (
    <>
      <Heading className={styles.title}>Тест за определяне на нивото</Heading>
      <section className={styles.test_section}>
        {QUESTIONS.map((question, index) => (
          <Question
            key={index}
            question={question}
            questionNumber={index + 1}
            testOver={testOver}
            onAnswerChange={updateAnswerResults}
          />
        ))}
      </section>
      <Button
        className={styles.submit_button}
        variant="contained"
        color="secondary"
        size={btnSize}
        onClick={handleTestOverClick}
      >
        Приключи теста
      </Button>
    </>
  );
}
