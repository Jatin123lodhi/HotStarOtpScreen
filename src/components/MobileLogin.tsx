import { ChangeEvent, useState } from "react";

interface IMobileLoginProps {
  
  handleMobileNoSubmit: (number: string) => void;
}
const MobileLogin = (props: IMobileLoginProps) => {
  const { handleMobileNoSubmit } = props;
  const [mobileNo, setMobileNo] = useState("");

  const handleMobileNoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (isNaN(Number(value)) || value.length > 10) {
      return;
    }
    setMobileNo(value);
     
  };
  return (
    <div className="text-white  h-full flex pt-[5%] flex-col items-center gap-8">
      <div className="text-2xl font-semibold">
        Log in to subscribe for super plan
      </div>
      <div>
        <div className="flex gap-3">
          <div className="border p-3 rounded-lg font-semibold text-xl">+91</div>
          <div>
            <input
              className="text-white bg-gray-900 border p-3 rounded-lg font-semibold text-xl"
              value={mobileNo}
              onChange={handleMobileNoChange}
              placeholder="Enter mobile number"
            />
          </div>
        </div>
      </div>
      <button
        onClick={()=>handleMobileNoSubmit(mobileNo)}
        disabled={mobileNo.length !== 10}
        className={`mt-6 text-xl font-semibold  p-2 w-[360px] text-center rounded-lg  ${
          mobileNo.length !== 10 ? "bg-blue-950" : "bg-blue-700"
        }`}
      >
        Get OTP{" "}
      </button>
    </div>
  );
};

export default MobileLogin;
