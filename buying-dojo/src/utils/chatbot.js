import {
  chatbotEntries,
  chatbotFallback,
} from "../data/chatbotKnowledge";

function normalizeText(value) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

export function getChatbotResponse(input) {
  const message = normalizeText(input);

  if (!message) {
    return chatbotFallback;
  }

  let bestMatch = null;
  let bestScore = 0;

  for (const entry of chatbotEntries) {
    let score = 0;

    for (const keyword of entry.keywords) {
      if (message.includes(keyword)) {
        score += keyword.split(" ").length;
      }
    }

    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }

  return bestMatch?.answer ?? chatbotFallback;
}
