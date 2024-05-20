import { useState } from "react";
import axios from "axios";

const MaskedEmail: React.FC<{ id: number; email: string }> = ({
  id,
  email,
}) => {
  const [unmaskedEmail, setUnmaskedEmail] = useState<string | null>(null);

  const handleUnmaskEmail = async () => {
    try {
      const response = await axios.get<{ email: string }>(
        `http://localhost:3000/api/users/${id}`
      );
      setUnmaskedEmail(response.data.email);
    } catch (error) {
      console.error("Error fetching user email:", error);
    }
  };

  return (
    <div className="flex gap-4">
      <span>{unmaskedEmail ? unmaskedEmail : email}</span>
      {!unmaskedEmail && (
        <div
          className="cursor-pointer hover:text-blue-700 text-xs text-gray-500 font-medium"
          onClick={() => handleUnmaskEmail()}
          data-testid={`table-user-${id}-show`}
        >
          Show
        </div>
      )}
    </div>
  );
};

export default MaskedEmail;
