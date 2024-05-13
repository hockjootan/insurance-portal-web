import Image from "next/image";
import MaskedEmail from "./MaskedEmail";
import { User } from "src/types/user";

export interface UserTableProps {
  users: User[];
}

const UserTable: React.FC<UserTableProps> = ({ users }) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-md text-gray-700 bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              User
            </th>
            <th scope="col" className="px-6 py-3 w-1/2">
              Email
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="bg-white border-b hover:bg-gray-50">
              <th scope="row" className="px-6 py-4 flex gap-2">
                <Image
                  src={user.avatar}
                  width={20}
                  height={20}
                  className="rounded-full"
                  alt="username"
                />
                <span className="font-medium text-gray-900 whitespace-nowrap">
                  {user.first_name} {user.last_name}
                </span>
              </th>
              <td className="px-6 py-4">
                <MaskedEmail email={user.email} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
