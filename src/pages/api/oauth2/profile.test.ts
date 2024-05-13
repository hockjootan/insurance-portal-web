/**
 * @jest-environment node
 */
import { testApiHandler } from "next-test-api-route-handler";
import axios from "axios";
import profileHandler from "./profile";
jest.mock("axios");

const mockAxios = axios as jest.Mocked<typeof axios>;

const mockResponse = {
  data: {
    id: "test-id",
    email: "test-email",
    name: "test-name",
    given_name: "test-given-name",
    family_name: "test-family-name",
    picture: "test-picture",
    locale: "test-locale",
  },
};

test("callback handler should set cookies and redirect to /dashboard", async () => {
  mockAxios.get.mockResolvedValue(mockResponse);

  await testApiHandler({
    pagesHandler: profileHandler,
    url: "/api/profile",
    requestPatcher: (req) => {
      req.headers.cookie =
        "accessToken=test-access-token; refreshToken=test-refresh-token";
    },
    test: async ({ fetch }) => {
      const response = await fetch({
        method: "GET",
      });

      expect(response.status).toBe(200);
      expect(await response.json()).toEqual(mockResponse.data);
    },
  });
});
