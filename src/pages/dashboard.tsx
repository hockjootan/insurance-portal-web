import Header from "src/components/Header";
import Footer from "src/components/Footer";

const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col w-full h-screen">
      <Header />
      <div className="container mx-auto max-w-screen-xl flex-1">
        <div>Welcome to dear username</div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
