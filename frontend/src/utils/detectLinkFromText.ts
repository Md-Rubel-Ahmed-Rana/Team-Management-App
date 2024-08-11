import { urlRegex } from "@/constants/regx";

export const detectLinks = (text: string) => {
  const parts = text.split(" ");
  const newTextArray: string[] = [];

  parts.forEach((part) => {
    if (part.match(urlRegex)) {
      const link = `<a class="text-blue-500 underline" href="${part}" target="_blank" rel="noopener noreferrer" >${part}</a>`;
      newTextArray.push(link);
    } else {
      const text = `<span>${part}</span>`;
      newTextArray.push(text);
    }
  });

  return newTextArray;
};
