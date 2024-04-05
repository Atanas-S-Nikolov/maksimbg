import { EMAIL_REGEX } from "@/constants/RegexConstants";

export function validateEmail(email) {
  return EMAIL_REGEX.test(email) ? undefined : "Невалиден имейл";
}
