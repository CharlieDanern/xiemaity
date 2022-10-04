import { Footer } from "../../containers";
import { Navbar, AutoStow } from "../../components";
import "./tool.css";

function Tool() {
   return (
      <div className="Tool">
         <div className="gradient__bg">
            <Navbar />
            <AutoStow />
         </div>
         <Footer />
      </div>
   );
}

export default Tool;
