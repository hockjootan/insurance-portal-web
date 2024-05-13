import { useState } from "react";

const MaskedEmail: React.FC<{ email: string }> = ({ email }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="flex gap-4">
      <span>{show ? email : "***@***.**"}</span>
      {!show && (
        <div
          className="cursor-pointer hover:text-blue-700"
          onClick={() => setShow(true)}
        >
          Show
        </div>
      )}
    </div>
  );
};

export default MaskedEmail;
