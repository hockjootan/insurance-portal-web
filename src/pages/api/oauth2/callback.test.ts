/**
 * @jest-environment node
 */
import { testApiHandler } from "next-test-api-route-handler";
import axios from "axios";
import callbackHandler from "./callback";
jest.mock("axios");

const mockAxios = axios as jest.Mocked<typeof axios>;

const mockResponse = {
  data: {
    access_token: "test-access-token",
    refresh_token: "test-refresh-token",
  },
};

test("callback handler should set cookies and redirect to /dashboard", async () => {
  // mock success test
  mockAxios.post.mockResolvedValue(mockResponse);

  await testApiHandler({
    pagesHandler: callbackHandler,
    url: "/api/callback",
    test: async ({ fetch }) => {
      const response = await fetch({
        method: "POST",
        body: JSON.stringify({
          code: "test-code",
        }),
      });

      expect(response.headers.get("location")).toBe("/dashboard");

      const cookies = response.headers.getSetCookie();
      expect(cookies).toHaveLength(2);

      const accessTokenCookie = cookies[0];
      expect(accessTokenCookie).toContain("accessToken=test-access-token");
      expect(accessTokenCookie).toContain("HttpOnly");
      expect(accessTokenCookie).toContain("Path=/");
      expect(accessTokenCookie).toContain("Max-Age=3600");

      const refreshTokenCookie = cookies[1];
      expect(refreshTokenCookie).toContain("refreshToken=test-refresh-token");
      expect(refreshTokenCookie).toContain("HttpOnly");
      expect(refreshTokenCookie).toContain("Path=/");
      expect(refreshTokenCookie).toContain("Max-Age=86400");
    },
  });
});
