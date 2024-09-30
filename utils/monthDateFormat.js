module.exports = (resDate) => {
  const date = new Date(resDate);
  const options = { month: "long" };
  const month = date.toLocaleDateString("en-US", options);
  const option = { year: "numeric" };
  const year = date.toLocaleDateString("en-US", option);
  const key = `${month}, ${year}`;
  return key;
};
