export const highlight = (name: string, keyword: string) => {
  if (!name) return '';
  const index = name.toLowerCase().indexOf(keyword.toLowerCase());
  if (index !== -1) {
    return name.replace(new RegExp(`(${keyword})`, 'giu'), '<strong>$1</strong>');
  }
  return name;
};
