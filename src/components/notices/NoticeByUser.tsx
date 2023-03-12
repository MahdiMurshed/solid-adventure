import CustomLoader from "@components/CustomLoader";
import useCurrentUser from "@hooks/useCurrentUser";
import useNoticesByUser from "@hooks/useNotice ByUser";
import NoticeCard from "./NoticeCard";

const NoticeByUser = () => {
  const { user, isLoading: userLoading } = useCurrentUser();
  const { notices, isLoading } = useNoticesByUser({
    userId: user.id as string,
  });
  if (isLoading || userLoading) return <CustomLoader />;
  return (
    <div>
      <div className="flex flex-col gap-4 p-4">
        {notices.map((notice) => (
          <NoticeCard key={notice.id} notice={notice} />
        ))}
      </div>
    </div>
  );
};

export default NoticeByUser;
