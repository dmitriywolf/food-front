export const formatDT = (sourceDate: string) => {
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  return new Intl.DateTimeFormat('en-GB', options).format(new Date(sourceDate));
};
