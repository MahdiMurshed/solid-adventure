import CustomLoader from "@components/CustomLoader";
import Heading from "@components/Headings";
import useNotices from "@hooks/useNotice";
import NoticeCard from "./NoticeCard";

const AllNotices = () => {
  const { notices, isLoading } = useNotices();
  if (isLoading) return <CustomLoader />;
  return (
    <div className="w-2/3 mx-auto">
      <Heading variant="h1">Notices</Heading>
      <div className="flex flex-col gap-4 p-4">
        {notices.map((notice) => (
          <NoticeCard key={notice.id} notice={notice} />
        ))}
      </div>
    </div>
  );
};

export default AllNotices;
