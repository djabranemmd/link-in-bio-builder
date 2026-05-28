export default function getLinkIcon(url = "") {
  const normalizedUrl = url.toLowerCase();

  if (normalizedUrl.includes("github")) return "🐙";
  if (normalizedUrl.includes("instagram")) return "📸";
  if (normalizedUrl.includes("linkedin")) return "💼";
  if (normalizedUrl.includes("twitter")) return "🐦";
  if (normalizedUrl.includes("x.com")) return "🐦";

  return "🔗";
}