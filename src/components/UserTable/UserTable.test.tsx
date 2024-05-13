import { render, screen, fireEvent } from "@testing-library/react";
import UserTable from "./";

const users = [
  {
    id: 1,
    avatar: "https://reqres.in/img/faces/1-image.jpg",
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
  },
  {
    id: 2,
    avatar: "https://reqres.in/img/faces/2-image.jpg",
    first_name: "Jane",
    last_name: "Smith",
    email: "jane.smith@example.com",
  },
];

describe("UserTable component", () => {
  test("renders the table correctly", () => {
    render(<UserTable users={users} />);

    expect(screen.getByText("User")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();

    users.forEach((user) => {
      // get element text to check user name is correct

      expect(
        screen.getByTestId(`table-user-${user.id}-name`)
      ).toHaveTextContent(`${user.first_name} ${user.last_name}`);
      expect(
        screen.getByTestId(`table-user-${user.id}-email`)
      ).toHaveTextContent("***@***.**");
    });
  });

  test("renders the user avatar correctly", () => {
    render(<UserTable users={users} />);

    users.forEach((user) => {
      const avatar = screen.getByTestId(`table-user-${user.id}-avatar`);
      expect(avatar).toHaveAttribute(
        "src",
        expect.stringContaining(encodeURIComponent(user.avatar))
      );
      expect(avatar).toHaveAttribute(
        "alt",
        `${user.first_name} ${user.last_name}`
      );
    });
  });

  test("renders the email after user click Show button", () => {
    render(<UserTable users={users} />);

    users.forEach((user) => {
      const showButton = screen.getByTestId(`table-user-${user.id}-show`);
      fireEvent.click(showButton);
      expect(
        screen.getByTestId(`table-user-${user.id}-email`)
      ).toHaveTextContent(user.email);
    });
  });
});
