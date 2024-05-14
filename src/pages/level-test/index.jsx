import styles from "@/styles/pages/level-test/LevelTest.module.css";

import Heading from "@/components/utils/Heading";
import Question from "@/components/utils/Question";

import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";

import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

import ReplayIcon from "@mui/icons-material/Replay";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

import {
  QUESTIONS,
  DEFAULT_ANSWERS_RESULTS,
  DEFAULT_ANSWERS_SELECTED,
} from "@/constants/LevelTestQuestions";
import { Typography, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/router";
import { theme } from "@/utils/theme";

const questionsCount = DEFAULT_ANSWERS_RESULTS.size;
const {
  primary: primaryColor,
  secondary: secondaryColor,
  success: successColor,
  warning: warningColor,
  error: errorColor,
} = theme.palette;

export default function LevelTest() {
  const [testOver, setTestOver] = useState(false);
  const [answersResults, setAnswersResults] = useState(DEFAULT_ANSWERS_RESULTS);
  const [answersSelected, setAnswersSelected] = useState(
    DEFAULT_ANSWERS_SELECTED
  );
  const [points, setPoints] = useState(0);
  const [grade, setGrade] = useState("");
  const [gradePercentage, setGradePercentage] = useState(0);
  const [unselectedAnswersCount, setUnselectedAnswersCount] = useState(0);
  const [gaugeColor, setGaugeColor] = useState(errorColor);
  const [error, setError] = useState(false);
  const router = useRouter();
  const mobile = useMediaQuery("(max-width: 500px)", { defaultMatches: false });
  const btnSize = mobile ? "small" : "medium";
  const btnLabel = testOver ? "Повтори теста" : "Приключи теста";
  const btnIcon = testOver ? <ReplayIcon /> : <AssignmentTurnedInIcon />;
  const resultTextVariant = mobile ? "h6" : "h4";
  const gaugeSize = mobile ? 100 : 175;
  const gaugeTextFontSize = mobile ? "medium" : "x-large";

  function updateAnswersSelected(questionNumber, answerSelected) {
    const answer = { questionNumber, answerSelected };
    const answersSelectedCopy = new Map(answersSelected);
    answersSelectedCopy.set(questionNumber, answer);
    setAnswersSelected(answersSelectedCopy);
  }

  function updateAnswersResults(questionNumber, answerCorrect, answerSelected) {
    const answer = { questionNumber, answerCorrect };
    const answersResultsCopy = new Map(answersResults);
    answersResultsCopy.set(questionNumber, answer);
    setAnswersResults(answersResultsCopy);
    updateAnswersSelected(questionNumber, answerSelected !== undefined);
  }

  function handleTestRetake() {
    router.reload();
  }

  function getUnselectedAnswersCount() {
    let count = 0;
    answersSelected.forEach((item) => {
      if (!item.answerSelected) {
        count++;
      }
    });
    return count;
  }

  function handleTestOverClick(event) {
    event.preventDefault();
    const unselectedCount = getUnselectedAnswersCount();
    setUnselectedAnswersCount(unselectedCount);

    if (getUnselectedAnswersCount() > 0) {
      setError(true);
      return;
    }

    setError(false);

    let testPoints = 0;

    answersResults.forEach((item) => {
      if (item.answerCorrect) {
        testPoints++;
      }
    });

    if (testPoints <= 5) {
      setGrade("Слаб 2");
      setGaugeColor(errorColor);
    } else if (testPoints > 5 && testPoints <= 8) {
      setGrade("Среден 3");
      setGaugeColor(warningColor);
    } else if (testPoints > 8 && testPoints <= 11) {
      setGrade("Добър 4");
      setGaugeColor(secondaryColor);
    } else if (testPoints > 11 && testPoints <= 14) {
      setGrade("Много Добър 5");
      setGaugeColor(primaryColor);
    } else {
      setGrade("Отличен 6");
      setGaugeColor(successColor);
    }

    setGradePercentage(parseInt((testPoints * 100) / questionsCount));
    setPoints(testPoints);
    setTestOver(true);
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
            onAnswerChange={updateAnswersResults}
          />
        ))}
      </section>
      <section className={styles.results_section}>
        {testOver ? (
          <>
            <Gauge
              width={gaugeSize}
              height={gaugeSize}
              value={gradePercentage}
              text={`${points} / ${questionsCount}`}
              startAngle={-120}
              endAngle={120}
              sx={{
                [`& .${gaugeClasses.valueArc}`]: {
                  fill: gaugeColor.main,
                },
                [`& .${gaugeClasses.valueText}`]: {
                  fontSize: gaugeTextFontSize,
                },
              }}
            />
            <Typography variant={resultTextVariant} color="secondary">
              Оценка: {grade}
            </Typography>
          </>
        ) : null}
        {error ? (
          <Alert severity="error">
            Имате {unselectedAnswersCount} неотговорени въпроса
          </Alert>
        ) : null}
      </section>
      <section className={styles.test_actions_section}>
        <Button
          variant="contained"
          color="secondary"
          size={btnSize}
          startIcon={btnIcon}
          onClick={testOver ? handleTestRetake : handleTestOverClick}
        >
          {btnLabel}
        </Button>
      </section>
    </>
  );
}
