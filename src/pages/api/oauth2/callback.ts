import axios from "axios";
import cookie from "cookie";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { code } = req.query;

  try {
    const { data } = await axios.post("https://oauth2.googleapis.com/token", {
      client_id: process.env.GOOGLE_OAUTH2_CLIENT_ID,
      client_secret: process.env.GOOGLE_OAUTH2_CLIENT_SECRET,
      redirect_uri: `${process.env.API_URL}/api/oauth2/callback`,
      grant_type: "authorization_code",
      code,
    });

    // Set HTTP-only cookies to avoid XSS attacks and not expose the token to the client side
    res.setHeader("Set-Cookie", [
      cookie.serialize("accessToken", data.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        path: "/",
        maxAge: 3600,
      }),
      cookie.serialize("refreshToken", data.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        path: "/",
        maxAge: 86400,
      }),
    ]);

    res.redirect("/dashboard");
  } catch (error) {
    console.error("Error getting authorization:", error);
    res.redirect("/error");
  }
}
