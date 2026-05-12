export const chatbotSuggestions = [
  "What is Buying Dojo?",
  "How does the personalized pick work?",
  "Which categories do you cover?",
  "Are your recommendations sponsored?",
];

export const chatbotEntries = [
  {
    id: "about",
    keywords: ["what is buying dojo", "who are you", "about buying dojo", "what do you do"],
    answer:
      "Buying Dojo is an independent tech buying guide. We shortlist products by category, explain trade-offs clearly, and help you choose with less noise.",
  },
  {
    id: "personalized",
    keywords: ["personalized pick", "299", "recommendation request", "custom recommendation"],
    answer:
      "The personalized pick is a paid recommendation request for Rs 299. Share your budget, use case, and timeline, and we respond with a focused product recommendation.",
  },
  {
    id: "categories",
    keywords: ["categories", "iem", "mobile", "laptop", "audio", "wearable", "what do you cover"],
    answer:
      "We currently cover IEMs, mobiles, laptops, audio, and wearables. Use the navigation menu or ask about a specific category.",
  },
  {
    id: "sponsorship",
    keywords: ["sponsored", "affiliate", "bias", "unbiased", "paid placement"],
    answer:
      "Recommendations are curated for fit and value, not sponsorship. Retail links may be affiliate links, but they do not change the ranking logic.",
  },
  {
    id: "rating",
    keywords: ["rating", "score", "how do you rate", "out of 10"],
    answer:
      "Each product includes a score out of 10 based on performance, value, and real-world usability for its category. Pros and cons are listed on every card.",
  },
  {
    id: "purchase",
    keywords: ["amazon", "flipkart", "buy", "where to buy", "purchase"],
    answer:
      "Each product card includes Amazon and Flipkart links so you can compare availability and pricing before you buy.",
  },
  {
    id: "contact",
    keywords: ["contact", "email", "support", "hello@buyingdojo.com"],
    answer:
      "You can reach us at hello@buyingdojo.com for support, partnership questions, or help with a personalized pick request.",
  },
  {
    id: "refund",
    keywords: ["refund", "money back", "cancel"],
    answer:
      "Refund terms depend on the service purchased. For personalized pick requests, contact support with your request details and we will review it promptly.",
  },
];

export const chatbotFallback =
  "I can help with Buying Dojo, categories, ratings, personalized picks, and where to buy. Try one of the suggested questions or ask about a specific category.";
