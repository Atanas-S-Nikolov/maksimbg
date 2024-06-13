import styles from "@/styles/components/utils/Question.module.css";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

import Image from "next/image";

import QuestionTypography from "./QuestionTypography";

import { useState } from "react";

export default function Question({
  question,
  questionNumber,
  testOver,
  onAnswerChange,
}) {
  const { questionText, suptext, subtext, answers, image, correctAnswerIndex } =
    question;
  const [selectedAnswer, setSelectedAnswer] = useState();
  const answerIsSelected = selectedAnswer !== undefined;
  const answerIsCorrect = selectedAnswer === correctAnswerIndex;
  let questionColor =
    !testOver || (answerIsSelected && answerIsCorrect) ? "secondary" : "error";

  function handleAnswerChange(event) {
    const value = parseInt(event.target.value);
    onAnswerChange(questionNumber, value === correctAnswerIndex, value);
    setSelectedAnswer(value);
  }

  function renderQuestion() {
    return (
      <>
        <QuestionTypography
          className={styles.question_text}
          color={questionColor}
        >
          {`${questionNumber}. ${questionText}`}
        </QuestionTypography>
      </>
    );
  }

  function renderQuestionWithSuptext() {
    return (
      <>
        <span className={styles.suptext_wrapper}>
          <QuestionTypography
            className={styles.question_text}
            color={questionColor}
          >
            {questionNumber}.
          </QuestionTypography>
          <QuestionTypography className={styles.suptext}>
            {suptext}
          </QuestionTypography>
        </span>
        <QuestionTypography
          className={styles.question_text}
          color={questionColor}
        >
          {questionText}
        </QuestionTypography>
      </>
    );
  }

  function renderQuestionWithSubtext() {
    return (
      <>
        {renderQuestion()}
        <QuestionTypography className={styles.subtext}>
          {subtext}
        </QuestionTypography>
      </>
    );
  }

  function renderQuestionLabel() {
    if (suptext) {
      return renderQuestionWithSuptext();
    } else if (subtext) {
      return renderQuestionWithSubtext();
    } else {
      return renderQuestion();
    }
  }

  return (
    <FormControl>
      <FormLabel id="question-label" htmlFor="question-buttons-group">
        {renderQuestionLabel()}
      </FormLabel>
      <section className={styles.answers_section}>
        <RadioGroup
          aria-labelledby="question-label"
          name="question-buttons-group"
          onChange={handleAnswerChange}
        >
          {answers.map((answer, index) => {
            let radioButton = <Radio color="secondary" disabled={testOver} />;
            let color = "inherit";

            if (testOver) {
              if (correctAnswerIndex === index) {
                color = "primary";
                radioButton = (
                  <Radio
                    checked
                    checkedIcon={<CheckCircleIcon />}
                    color={color}
                  />
                );
              } else if (
                selectedAnswer === index &&
                selectedAnswer !== correctAnswerIndex
              ) {
                color = "error";
                radioButton = (
                  <Radio checked checkedIcon={<CancelIcon />} color={color} />
                );
              }
            }

            return (
              <FormControlLabel
                key={index}
                value={index}
                control={radioButton}
                label={
                  <QuestionTypography color={color}>
                    {answer}
                  </QuestionTypography>
                }
              />
            );
          })}
        </RadioGroup>
        {image ? (
          <Image
            className={styles.answer_image}
            src={image}
            alt="Question image"
          />
        ) : null}
      </section>
    </FormControl>
  );
}
