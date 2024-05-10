import styles from "@/styles/components/utils/Question.module.css";

import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function Question({ question, questionNumber }) {
  const { questionText, suptext, subtext, answers, image } = question;
  return (
    <FormControl>
      <FormLabel id="question-label" className={styles.question_text}>{`${questionNumber}. ${questionText}`} </FormLabel>
      <RadioGroup
        aria-labelledby="question-label"
        name="question-buttons-group"
      >
      {answers.map((answer, index) => (
        <FormControlLabel key={index} value={index + 1} control={<Radio />} label={answer} />
      ))}
      </RadioGroup>
    </FormControl>
  )
}
