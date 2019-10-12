const processResponse = async (response) => {
  if (response.status >= 300) {
    const error = await response.json();
    const processedError = new Error(error.message);
    processedError.status = response.status;
    processedError.body = error;

    throw processedError;
  }
  return response.json();
};

export default {
  processResponse
};
