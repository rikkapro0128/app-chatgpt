export const delayRender = (ms: number): Promise<void> => {
  return new Promise((res) => {
    setTimeout(() => {
      res(null);
    }, ms);
  });
};
