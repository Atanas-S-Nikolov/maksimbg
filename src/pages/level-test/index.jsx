import styles from "@/styles/pages/level-test/LevelTest.module.css";

import Heading from "@/components/utils/Heading";
import Question from "@/components/utils/Question";

import Button from "@mui/material/Button";

import ReplayIcon from "@mui/icons-material/Replay";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

import {
  QUESTIONS,
  getDefaultAnswersResults,
} from "@/constants/LevelTestQuestions";
import { Typography, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/router";

export default function LevelTest() {
  const [testOver, setTestOver] = useState(false);
  const [answersResults, setAnswersResults] = useState(
    getDefaultAnswersResults()
  );
  const [points, setPoints] = useState(0);
  const [grade, setGrade] = useState("");
  const router = useRouter();
  const mobile = useMediaQuery("(max-width: 425px)", { defaultMatches: false });
  const btnSize = mobile ? "small" : "medium";
  const resultTextVariant = mobile ? "h6" : "h4";

  function updateAnswerResults(questionNumber, answerCorrect) {
    const answer = { questionNumber, answerCorrect };
    const answersResultsCopy = new Map(answersResults);
    answersResultsCopy.set(questionNumber, answer);
    setAnswersResults(answersResultsCopy);
  }

  function handleTestRetake() {
    router.reload();
  }

  function handleTestOverClick(event) {
    event.preventDefault();
    setTestOver(true);
    let testPoints = 0
    answersResults.forEach((item) => {
      if (item.answerCorrect) {
        testPoints++;
      }
    });
    setPoints(testPoints);
    if (testPoints <= 5) {
      setGrade("Слаб 2");
    } else if (testPoints > 5 && testPoints <= 8 ) {
      setGrade("Среден 3");
    } else if (testPoints > 8 && testPoints <= 11 ) {
      setGrade("Добър 4");
    } else if (testPoints > 11 && testPoints <= 14 ) {
      setGrade("Много Добър 5");
    } else {
      setGrade("Отличен 6");
    }
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
      <section className={styles.test_actions_section}>
        <Button
          variant="contained"
          color="secondary"
          size={btnSize}
          startIcon={<ReplayIcon />}
          onClick={handleTestRetake}
        >
          Повтори теста
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size={btnSize}
          startIcon={<AssignmentTurnedInIcon />}
          onClick={handleTestOverClick}
        >
          Приключи теста
        </Button>
      </section>
      {testOver ? (
        <section className={styles.results_section}>
          <Typography variant={resultTextVariant} color="secondary">
            Оценка: {grade}
          </Typography>
          <Typography variant={resultTextVariant} color="secondary">
            Точки: {points}/{getDefaultAnswersResults().size}
          </Typography>
        </section>
      ) : null}
    </>
  );
}
