import { render, screen } from "@testing-library/react";

import Footer from "./Footer";
import { footerGroupLinks } from "src/config";

test("renders footer component", () => {
  render(<Footer />);

  // Assert that the footer component is rendered
  const footerElement = screen.getByTestId("z-footer");
  expect(footerElement).toBeInTheDocument();

  // Assert that the footer contains the Z™ logo
  const logoElement = screen.getByText("Z");
  expect(logoElement).toBeInTheDocument();

  // Assert that the footer contains the copyright element
  const element = screen.getByTestId("z-copyright-text");
  expect(element).toBeInTheDocument();
});

test("renders the navigation links correctly", () => {
  render(<Footer />);
  footerGroupLinks.forEach((group, groupIndex) => {
    const groupElement = screen.getByText(group.title);
    expect(groupElement).toBeInTheDocument();

    group.links.forEach((link, linkIndex) => {
      const linkElement = screen.getByText(link.title);
      expect(linkElement).toBeInTheDocument();
      expect(linkElement).toHaveAttribute("href", link.href);
    });
  });
});
