/* eslint-disable @typescript-eslint/ban-ts-comment */
class HttpError extends Error {
  constructor(message: string, code: number) {
    super(message);
    // @ts-ignore
    this.code = code;
  }
}

export default HttpError;
