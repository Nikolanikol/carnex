import { t } from "i18next";

export const translateGenerationRow = (string: string) => {
  if (string) {
    const arr = string.split(" ");
    const result = arr.map((value) => t(value)).join(" ");

    return result;
  }
};
