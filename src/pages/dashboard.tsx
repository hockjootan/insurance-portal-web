import Header from "src/components/Header";
import Footer from "src/components/Footer";
import UserTable from "src/components/UserTable";
import { useSelector } from "react-redux";
import { GetServerSideProps } from "next";

import { makeStore, RootState } from "src/store";
import { fetchUsers } from "src/store/userListSlice";

const Dashboard: React.FC = () => {
  const users = useSelector((state: RootState) => state.userList.users);
  const profile = useSelector((state: RootState) => state.profile.profile);

  if (!profile) {
    return null;
  }

  return (
    <div className="flex flex-col w-full h-screen">
      <Header />
      <div className="container mx-auto max-w-screen-xl flex-1 p-4 py-8">
        <div className="font-medium text-md mb-8">
          Welcome, {profile.given_name} {profile.family_name}!
        </div>
        <UserTable users={users} />
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;

export const getServerSideProps: GetServerSideProps = async () => {
  const store = makeStore();
  await store.dispatch(fetchUsers());

  // Serialize the state to avoid serialization issues (e.g., Date objects)
  const serializedState = JSON.stringify(store.getState());
  const initialReduxState = JSON.parse(serializedState);

  return { props: { initialReduxState } };
};
