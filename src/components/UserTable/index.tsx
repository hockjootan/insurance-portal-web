import Image from "next/image";
import MaskedEmail from "./MaskedEmail";

const UserTable: React.FC = () => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-md text-gray-700 bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              User
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b hover:bg-gray-50">
            <th scope="row" className="px-6 py-4 flex gap-2">
              <Image
                src="/"
                width={20}
                height={20}
                className="rounded-full"
                alt="username"
              />
              <span className="font-medium text-gray-900 whitespace-nowrap">
                Richard Tan
              </span>
            </th>
            <td className="px-6 py-4">
              <MaskedEmail email="richard.tan@gmail.com" />
            </td>
          </tr>
          <tr className="bg-white border-b hover:bg-gray-50">
            <th scope="row" className="px-6 py-4 flex gap-2">
              <div className="h-5 w-5 rounded-full bg-gray-200" />
              <span className="font-medium text-gray-900 whitespace-nowrap">
                Richard Tan
              </span>
            </th>
            <td className="px-6 py-4">
              <MaskedEmail email="richard.tan@gmail.com" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
