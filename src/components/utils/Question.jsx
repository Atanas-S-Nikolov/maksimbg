import styles from "@/styles/components/utils/Question.module.css";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Image from "next/image";
import QuestionTypography from "./QuestionTypography";

export default function Question({ question, questionNumber }) {
  const { questionText, suptext, subtext, answers, image } = question;

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
        >
          {answers.map((answer, index) => (
            <FormControlLabel
              key={index}
              value={index}
              control={<Radio color="secondary" />}
              label={<QuestionTypography>{answer}</QuestionTypography>}
            />
          ))}
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
