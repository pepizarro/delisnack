export type ActionResponse = {
  // optional code
  code?: number;
  message: string;
  error: boolean;
};

export type FormState = {
  message: string;
  error: boolean;
};
