import { Footer, Header } from "../../containers";
import { Navbar } from "../../components";
import "./home.css";

function Home() {
   return (
      <div className="Home">
         <div className="gradient__bg">
            <Navbar />
            <Header />
         </div>
         <Footer />
      </div>
   );
}

export default Home;
