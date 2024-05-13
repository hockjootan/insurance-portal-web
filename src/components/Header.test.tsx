import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { clearProfile } from "src/store/profileSlice";

import Header from "./Header";
import { headerPages } from "src/config";

jest.mock("axios", () => ({
  post: jest.fn(() => Promise.resolve()),
}));
jest.mock("next/router", () => ({
  ...(jest.requireActual("next/router") as object),
  useRouter: jest.fn(),
}));
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));
jest.mock("src/store/profileSlice", () => ({
  clearProfile: jest.fn(() => ({
    type: "profile/clearProfile",
    payload: undefined,
  })),
}));

describe("Header component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the logo correctly", () => {
    (useRouter as jest.Mock).mockReturnValue({ pathname: "/dashboard" });
    render(<Header />);
    const logoElement = screen.getByText("Z");
    expect(logoElement).toBeInTheDocument();
  });

  test("renders the navigation links correctly", () => {
    (useRouter as jest.Mock).mockReturnValue({ pathname: "/dashboard" });

    render(<Header />);
    const navLinks = screen.getAllByRole("link");
    expect(navLinks).toHaveLength(headerPages.length + 1); // +1 for the logo link

    // logo link
    expect(navLinks[0]).toHaveTextContent("Z");
    expect(navLinks[0]).toHaveAttribute("href", "/dashboard");

    headerPages.forEach((page, index) => {
      expect(navLinks[index + 1]).toHaveTextContent(page.title);
      expect(navLinks[index + 1]).toHaveAttribute("href", page.href);
    });
  });

  test("calls handleLogout and redirects to login page on logout link click", async () => {
    const dispatch = jest.fn();
    // FIXME: The following type should be `jest.Mock` instead of `any`
    (useDispatch as any).mockReturnValue(dispatch);
    (useRouter as jest.Mock).mockReturnValue({ push: jest.fn() });
    render(<Header />);
    const logoutLink = screen.getByText("Logout");
    fireEvent.click(logoutLink);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith("/api/logout");
      expect(dispatch).toHaveBeenCalledWith(clearProfile());
      expect(useRouter().push).toHaveBeenCalledWith("/login");
    });
  });
});
