import { ChangeEvent, useEffect, useRef, useState } from "react";

interface IOtpLoginProps {
  mobileNo: string;
}
const OtpLogin = (props: IOtpLoginProps) => {
  const { mobileNo } = props;
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);
  console.log(otp);

  const handleOtpChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;

    if ((value >= "0" && value <= "9") || value === "") {
      const updatedOtp = [...otp];
      updatedOtp[index] = value;
      setOtp(updatedOtp);

      if (value !== "" && index < otp.length) {
        //move to the next empty value
        for (let i = 0; i < otp.length; i++) {
          if (otp[i] == "" && i !== index) {
            inputRefs.current[i]?.focus();
            return;
          } else if (i == 3 && index < otp.length - 1) {
            inputRefs.current[index + 1]?.focus();
          }
        }
      }
    }
  };

  const moveCursorToEnd = (idx: number) => {
    setTimeout(() => {
      const input = inputRefs.current[idx];
      const len = input?.value.length || 0;
      input?.setSelectionRange(len, len);
    }, 300);
  };

  return (
    <div className="  h-full pt-[5%] flex justify-center  gap-5">
      <div className="flex flex-col gap-5 ">
        <div className="text-white text-lg font-semibold">
          Enter OTP sent to +91{mobileNo}{" "}
        </div>
        <div className="flex gap-5">
          {otp.map((value, idx) => {
            return (
              <input
                type="text"
                maxLength={1}
                ref={(ref) => (inputRefs.current[idx] = ref)}
                key={idx}
                value={value}
                onChange={(e) => handleOtpChange(e, idx)}
                onKeyUp={(e) => {
                  if (e.key === "Backspace" && idx > 0 && value === "") {
                    inputRefs.current[idx - 1]?.focus();
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
                    moveCursorToEnd(idx);
                  }
                  //empty the value - if already there a value and the key pressed is a number key
                  const newOtp = [...otp];
                  if (newOtp[idx] !== "" && e.key >= "0" && e.key <= "9") {
                    newOtp[idx] = "";
                    setOtp(newOtp);
                  }
                }}
                onMouseDown={() => moveCursorToEnd(idx)}
                className="outline-none font-semibold bg-slate-800 border border-gray-50 text-white rounded-lg p-2 text-2xl text-center w-[60px] h-[60px]"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OtpLogin;
