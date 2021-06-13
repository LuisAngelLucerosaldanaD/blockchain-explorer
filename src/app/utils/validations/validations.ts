export const onlyNumbers = (value: any) => {
  const key = value.charCode;
  return key >= 48 && key <= 57;
};
