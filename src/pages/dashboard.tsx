import Header from "src/components/Header";
import Footer from "src/components/Footer";
import UserTable from "src/components/UserTable";

const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col w-full h-screen">
      <Header />
      <div className="container mx-auto max-w-screen-xl flex-1 p-4 py-8">
        <div className="font-medium text-md mb-8">Welcome to dear username</div>
        <UserTable />
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
