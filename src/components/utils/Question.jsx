import styles from "@/styles/components/utils/Question.module.css";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

import Image from "next/image";

import QuestionTypography from "./QuestionTypography";

import { useState } from "react";

export default function Question({ question, questionNumber, testOver, onAnswerChange }) {
  const { questionText, suptext, subtext, answers, image, correctAnswerIndex } = question;
  const [selectedAnswer, setSelectedAnswer] = useState();

  function handleAnswerChange(event) {
    const { value } = event.target;
    onAnswerChange(questionNumber, value === correctAnswerIndex);
    setSelectedAnswer(parseInt(event.target.value));
  }

  function renderQuestion() {
    return (
      <>
        <QuestionTypography className={styles.question_text}>
          {`${questionNumber}. ${questionText}`}
        </QuestionTypography>
      </>
    );
  }

  function renderQuestionWithSuptext() {
    return (
      <>
        <span className={styles.suptext_wrapper}>
          <QuestionTypography className={styles.question_text}>
            {questionNumber}.
          </QuestionTypography>
          <QuestionTypography className={styles.suptext}>
            {suptext}
          </QuestionTypography>
        </span>
        <QuestionTypography className={styles.question_text}>
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
            let RadioButton = <Radio color="secondary" disabled={testOver} />;
            let color = "inherit";
            if (testOver) {
              if (correctAnswerIndex === index) {
                color = "primary";
                RadioButton = <Radio checked checkedIcon={<CheckCircleIcon />} color={color} />
              } else if (selectedAnswer === index && selectedAnswer !== correctAnswerIndex) {
                color = "error";
                RadioButton = <Radio checked checkedIcon={<CancelIcon />} color={color} />
              }
            }

            return (
              <FormControlLabel
                key={index}
                value={index}
                control={RadioButton}
                label={<QuestionTypography color={color}>{answer}</QuestionTypography>}
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
