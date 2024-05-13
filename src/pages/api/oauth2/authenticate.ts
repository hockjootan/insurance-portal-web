// https://developers.google.com/identity/protocols/oauth2/web-server#node.js_1

import crypto from "crypto";

import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const clientId = process.env.GOOGLE_OAUTH2_CLIENT_ID;
  const redirectUri = `${process.env.API_URL}/api/oauth2/callback`;

  // Access scopes for user's profile and email
  const scope = encodeURIComponent(
    [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" ")
  );

  // Generate a secure random state value.
  const state = crypto.randomBytes(32).toString("hex");

  // Offline access type to get refresh token, even if the user is not present
  const accessType = "offline";

  // Prompt the user for consent
  const prompt = "consent";

  // Response type
  const responseType = "code";

  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&prompt=${prompt}&access_type=${accessType}&state=${state}&response_type=${responseType}&include_granted_scopes=true`;

  res.redirect(302, googleAuthUrl);
}
