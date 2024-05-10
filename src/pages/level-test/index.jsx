import styles from "@/styles/pages/level-test/LevelTest.module.css";

import Button from '@mui/material/Button';

import Heading from "@/components/utils/Heading";
import Question from "@/components/utils/Question";

import { QUESTIONS } from "@/constants/LevelTestQuestions";

export default function LevelTest() {
  return (
    <>
      <Heading>Тест за определяне на нивото</Heading>
      <section className={styles.test_section}>
        {QUESTIONS.map((question, index) => <Question key={index} question={question} questionNumber={index + 1}/>)}
      </section>
      <Button variant="contained" color="secondary">Приключи теста</Button>
    </>
  )
}
