module.exports = (resDate) => {
  const date = new Date(resDate);
  const daySuffix = getDaySuffix(date);
  const options = { month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);
  const key = `${formattedDate}${daySuffix}`;
  return key;
};

function getDaySuffix(day) {
  if (day >= 11 && day <= 13) {
    return "th";
  }
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}
