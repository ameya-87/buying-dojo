export const categoryLabels = {
  iems: "IEMs",
  mobiles: "Mobiles",
  laptops: "Laptops",
  audio: "Audio",
  wearables: "Wearables",
};

export function formatCategory(slug) {
  if (!slug) {
    return "Category";
  }

  return categoryLabels[slug.toLowerCase()] || slug;
}
