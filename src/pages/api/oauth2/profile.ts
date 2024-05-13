import axios from "axios";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const token = req.cookies["accessToken"];

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const googleResponse = await axios.get(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    res.status(200).json(googleResponse.data);
  } catch (error) {
    console.error("Failed to fetch user info:", error);
    res.status(500).json({ error: "Failed to fetch user information" });
  }
}
