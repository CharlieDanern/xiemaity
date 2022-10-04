import { Footer } from "../../containers";
import { Navbar } from "../../components";
import "./library.css";

function Library() {
   return (
      <div className="Library">
         <div className="gradient__bg">
            <Navbar />
            <div className="nk__library">Haven't got shit in the Library yet</div>
         </div>
         <Footer />
      </div>
   );
}

export default Library;
