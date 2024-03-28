export const generateTime = () => {
  const startTime = 9;
  const endTime = 20;

  const timeArray = [];

  for (let hour = startTime; hour <= endTime; hour++) {
    timeArray.push(`${String(hour).padStart(2, "0")}:00`);
    timeArray.push(`${String(hour).padStart(2, "0")}:30`);
  }
  timeArray.push(`${String(endTime + 1).padStart(2, "0")}:00`);

  return timeArray;
};
