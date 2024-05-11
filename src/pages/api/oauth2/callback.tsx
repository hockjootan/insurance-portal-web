import axios from "axios";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { code } = req.query;

  try {
    const { data } = await axios({
      url: "https://oauth2.googleapis.com/token",
      method: "post",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      params: {
        client_id: process.env.GOOGLE_OAUTH2_CLIENT_ID,
        client_secret: process.env.GOOGLE_OAUTH2_CLIENT_SECRET,
        redirect_uri: `${process.env.API_URL}/api/oauth2/callback`,
        grant_type: "authorization_code",
        code,
      },
    });

    // TODO: handling the response
    // token, refresh_token, expiry, etc.
  } catch (error) {
    console.error("Error getting authorization:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
