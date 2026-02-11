export const ToLocalISOString = (dateStr: string) => {
  const d = new Date(dateStr);
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString();
};

export const ToUtcISOString = (dateTimeStr: string) => {
  return new Date(dateTimeStr).toISOString();
};
