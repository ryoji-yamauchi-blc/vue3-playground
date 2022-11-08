const post = (url: string, data: unknown) => {
  console.log({ url, data });
  return new Promise((resolve) =>
    setTimeout(() => resolve({ result: "success" }), 1000)
  );
};

export const client = {
  post,
};
