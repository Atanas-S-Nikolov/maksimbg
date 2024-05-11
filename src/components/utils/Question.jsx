import styles from "@/styles/components/utils/Question.module.css";

import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Image from "next/image";

export default function Question({ question, questionNumber }) {
  const { questionText, suptext, subtext, answers, image } = question;

  function renderQuestion() {
    return (
      <>
        <Typography className={styles.question_text}>
          {`${questionNumber}. ${questionText}`}
        </Typography>
      </>
    );
  }

  function renderQuestionWithSuptext() {
    return (
      <>
        <span className={styles.suptext_wrapper}>
          <Typography className={styles.question_text}>
            {questionNumber}.
          </Typography>
          <Typography className={styles.suptext}>{suptext}</Typography>
        </span>
        <Typography className={styles.question_text}>{questionText}</Typography>
      </>
    );
  }

  function renderQuestionWithSubtext() {
    return (
      <>
        {renderQuestion()}
        <Typography className={styles.subtext}>{subtext}</Typography>
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
              className={styles.answer_label}
              value={index}
              control={<Radio color="secondary" />}
              label={answer}
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
