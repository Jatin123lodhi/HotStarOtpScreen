import { useState } from "react";
import MobileLogin from "./components/MobileLogin";
import OtpLogin from "./components/OtpLogin";
import { Toaster } from "sonner";
 

const App = () => {
  const [step, setStep] = useState(1);
  const [useMobileNo,setUserMobileNo] = useState("");
  const handleMobileNoSubmit = (mobileNo:string)=>{
    setUserMobileNo(mobileNo)
    setStep(step+1)
  }
  
  return (
    <div className="flex justify-center pt-[5%]">
      <div className=" w-[700px] h-[400px] rounded-lg shadow-xl bg-gray-900">
        {step == 1 && <MobileLogin handleMobileNoSubmit={handleMobileNoSubmit}  />}
        {step == 2 && <OtpLogin mobileNo={useMobileNo} />}
      </div>
      <Toaster/> 
    </div>
  );
};

export default App;
