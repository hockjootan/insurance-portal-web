/**
 * @jest-environment node
 */
import { testApiHandler } from "next-test-api-route-handler";
import authenticateHandler from "./authenticate";

describe("OAuth2 API Endpoint", () => {
  it("redirects to authenticate URL successfully", async () => {
    await testApiHandler({
      pagesHandler: authenticateHandler,
      url: "/api/authenticate",
      test: async ({ fetch }) => {
        const response = await fetch({ method: "GET" });
        expect(response.status).toBe(302);
        expect(response.headers.get("location")).toMatch(
          /^https:\/\/accounts.google.com\/o\/oauth2\/v2\/auth/
        );
      },
    });
  });

  it("redirects to authenticate URL with correct query parameters", async () => {
    await testApiHandler({
      pagesHandler: authenticateHandler,
      url: "/api/authenticate",
      test: async ({ fetch }) => {
        const response = await fetch({ method: "GET" });
        const location = response.headers.get("location");
        const url = new URL(location || "");
        expect(url.searchParams.get("client_id")).toBe(
          process.env.GOOGLE_OAUTH2_CLIENT_ID
        );
        expect(url.searchParams.get("redirect_uri")).toBe(
          `${process.env.API_URL}/api/oauth2/callback`
        );
        // Accessing the searchParams will decode the parameters
        expect(url.searchParams.get("scope")).toBe(
          [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email",
          ].join(" ")
        );
        expect(url.searchParams.get("prompt")).toBe("consent");
        expect(url.searchParams.get("access_type")).toBe("offline");
        expect(url.searchParams.get("response_type")).toBe("code");
        expect(url.searchParams.get("include_granted_scopes")).toBe("true");
      },
    });
  });
});
