import PasswordValidator from 'password-validator';

const PASSWORD_LENGTH_MESSAGE = "Паролата трябва съдържа 8-30 символа";
const PASSWORD_UPPERCASE_MESSAGE = "Паролата трябва да съдържа поне 1 главна английска буква";
const PASSWORD_LOWERCASE_MESSAGE = "Паролата трябва да съдържа поне 1 малка английска буква";
const PASSWORD_DIGITS_MESSAGE = "Паролата трябва да съдържа поне 1 цифра";
const PASSWORD_SYMBOLS_MESSAGE = "Паролата трябва да съдържа поне 1 специален (!@#$%^&*()+) символ";

function formatPasswordSequenceMessage(sequenceStr) {
  return `Паролата не трябва да съдържа повече от 3 символа от поредицата ${sequenceStr}`;
}

function validateForIllegalSequence(password, sequence, message = sequence) {
  for (let i = sequence.length - 1; i > 3; i--) {
    const substring = sequence.substring(0, i);
    if (password.toLowerCase().includes(substring)) {
      throw new Error(formatPasswordSequenceMessage(message));
    }
  }
}

export function validatePassword(password) {
  const validator = new PasswordValidator();
  validator
  .is().min(8, PASSWORD_LENGTH_MESSAGE)
  .is().max(30, PASSWORD_LENGTH_MESSAGE)
  .has().uppercase(1, PASSWORD_UPPERCASE_MESSAGE)
  .has().lowercase(1, PASSWORD_LOWERCASE_MESSAGE)
  .has().digits(1, PASSWORD_DIGITS_MESSAGE)
  .has().symbols(1, PASSWORD_SYMBOLS_MESSAGE)
  .has().not().spaces();

  let message = validator.validate(password, { details: true })[0]?.message;

  if (!message) {
    const ABCD_SEQUENCE = "abcdefghijklmnopqrstuvwxyz";
    const QWERTY_SEQUENCE = "qwertyuiop";
    const ILLEGAL_DIGITS_SEQUENCE = "1234567890";
    const ILLEGAL_LEADING_ZERO_DIGITS_SEQUENCE = "0123456789";

    try {
      validateForIllegalSequence(password, ABCD_SEQUENCE, "ABCD...");
      validateForIllegalSequence(password, QWERTY_SEQUENCE, "QWERTY...");
      validateForIllegalSequence(password, ILLEGAL_DIGITS_SEQUENCE);
      validateForIllegalSequence(password, ILLEGAL_LEADING_ZERO_DIGITS_SEQUENCE);
    } catch(error) {
      message = error.message;
    }
  }

  return message;
}
