import Header from "@components/Header";
import AllNotices from "@components/notices/AllNotices";

const Notices = () => {
  return (
    <div className="w-2/3 p-4">
      <Header title="Notices" />
      <AllNotices />
    </div>
  );
};

export default Notices;
