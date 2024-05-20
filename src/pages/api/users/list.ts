import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { User, UserListApiResponse } from "src/types/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const users = await fetchAllUsers();
    const filteredUsers = filterAndMaskUsers(users);
    res.status(200).json(filteredUsers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
}

const fetchAllUsers = async (
  page: number = 1,
  allUsers: User[] = []
): Promise<User[]> => {
  const url = `https://reqres.in/api/users?page=${page}`;
  try {
    const response = await axios.get<UserListApiResponse>(url);
    const fetchedUsers = response.data.data;
    const updatedUsers = allUsers.concat(fetchedUsers);

    if (page < response.data.total_pages) {
      return fetchAllUsers(page + 1, updatedUsers);
    }

    return updatedUsers;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    throw new Error("Failed to fetch users");
  }
};

const filterAndMaskUsers = (users: User[]): User[] => {
  return users
    .filter(
      (user) =>
        user.first_name.startsWith("G") || user.last_name.startsWith("W")
    )
    .map((user) => ({
      ...user,
      email: "***@***.**",
    }));
};
