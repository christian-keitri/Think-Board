import jwt, { SignOptions } from "jsonwebtoken";

export const createToken = (
  id: string,
  email: string,
  expiresIn: SignOptions["expiresIn"] // ✅ match type directly
): string => {
  const options: SignOptions = { expiresIn };

  return jwt.sign(
    { id, email },
    process.env.JWT_SECRET as string,
    options
  );
};
