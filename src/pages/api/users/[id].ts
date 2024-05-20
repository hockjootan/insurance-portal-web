import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { User } from "src/types/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const user = await fetchUserById(id as string);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user" });
  }
}

const fetchUserById = async (id: string): Promise<User> => {
  const url = `https://reqres.in/api/users/${id}`;
  try {
    const response = await axios.get<{ data: User }>(url);
    return response.data.data;
  } catch (error) {
    console.error(`Failed to fetch user with ID ${id}:`, error);
    throw new Error("Failed to fetch user");
  }
};
