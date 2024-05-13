import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Clear the cookie or session token
  res.setHeader("Set-Cookie", [
    `accessToken=deleted; Max-Age=0; path=/`,
    `refreshToken=deleted; Max-Age=0; path=/`,
  ]);

  res.status(200).json({ message: "Logged out successfully" });
}
