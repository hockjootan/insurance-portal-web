import { useState } from "react";

const MaskedEmail: React.FC<{ id: number; email: string }> = ({
  id,
  email,
}) => {
  const [show, setShow] = useState(false);

  return (
    <div className="flex gap-4">
      <span>{show ? email : "***@***.**"}</span>
      {!show && (
        <div
          className="cursor-pointer hover:text-blue-700 text-xs text-gray-500 font-medium"
          onClick={() => setShow(true)}
          data-testid={`table-user-${id}-show`}
        >
          Show
        </div>
      )}
    </div>
  );
};

export default MaskedEmail;
