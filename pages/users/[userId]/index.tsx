/* eslint-disable @next/next/no-img-element */
import CustomLoader from "@components/CustomLoader";
import Layout from "@components/layout";
import NoticeByUser from "@components/notices/NoticeByUser";
import { UserInfoIcons } from "@components/users/UserCard";
import {
  IMaterialOfUser,
  useMaterialOfSpecificUser
} from "@hooks/useMaterialsOfSpecificUser";
import useNoticesByUser from "@hooks/useNotice ByUser";
import { useStudentsOfSpecificSupervisor } from "@hooks/useStudentsOfSpecificSupervisor";
import useUser from "@hooks/useUser";
import { Anchor, Badge, SimpleGrid } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { ROLES } from "src/constants";
import { ILink } from "src/types";

const User = () => {
  const router = useRouter();
  const { userId } = router.query as {
    userId: string;
  };
  const { user, isLoading } = useUser({ userId });
  const { isLoading: noticeLoading, notices } = useNoticesByUser({ userId });

  const { supervisorMaterials, authorMaterials, hasMaterials } =
    useMaterialOfSpecificUser({
      userId,
      role: user?.role as string,
    });

  const links = user?.links as unknown as ILink[];
  const materials = [...supervisorMaterials, ...authorMaterials];

  console.log({ materials, user });

  if (isLoading || noticeLoading || !user) return <CustomLoader />;
  return (
    <Layout>
      <div className="mt-6 w-6/12 mx-auto shadow-md rounded-lg p-4 min-h-[90vh]">
        <div className="flex items-center gap-4">
          <img
            src={user.image as string}
            alt={user.name?.split(" ")[0] as string}
            className="rounded-full"
          />
          <div>
            <h3 className="text-2xl font-semibold ">{user.name}</h3>
            <span className="text-slate-700">{user.bio || ""}</span>
            <p className="text-slate-600 text-xs py-2">
              Department Of Computer Science and Engineering
            </p>

            <p className="text-slate-600 text-sm ">
              Shahjalal University of Science and Technology
            </p>
          </div>
        </div>
        <div className="pt-6">
          <h3 className="header-3 border-b-[1px]"> Contact information</h3>
          <ContactInfo label="Email" data={user.email} />
          {user.secondaryEmail !== "" && (
            <ContactInfo label="Secondary email" data={user.secondaryEmail} />
          )}
          {user.contactNumber !== "" && (
            <ContactInfo label="Phone" data={user.contactNumber} />
          )}
          {links?.length > 0 &&
            links.map(({ label, url }: ILink, ind: number) => (
              <ContactLink key={ind} label={label} url={url} />
            ))}

          <div className="pt-6">
            <h3 className="header-3 border-b-[1px]"> Research Interests</h3>
            <div className="flex gap-4 p-4 flex-wrap">
              {user.researchInterests?.map((cat) => (
                <Badge key={cat.id} variant="gradient" size="lg">
                  {cat.name}
                </Badge>
              ))}
            </div>
          </div>
          <div className="pt-6">
            <h3 className="header-3 border-b-[1px]"> Materials</h3>
            {hasMaterials ? (
              <UserMaterials materials={materials} />
            ) : (
              <p className="text-slate-400 header-2 text-center pt-20">
                No materials found
              </p>
            )}
          </div>
          {user.role === ROLES.TEACHER && (
            <div className="pt-6">
              <h3 className="header-3 border-b-[1px]"> Announcements</h3>
              {notices.length > 0 ? (
                <NoticeByUser />
              ) : (
                <p className="text-slate-400 header-2 text-center pt-20">
                  No Announcement found
                </p>
              )}
            </div>
          )}
          {user.role === ROLES.TEACHER && (
            <div className="pt-6">
              <h3 className="header-3 border-b-[1px]">
                Students worked under {user.name?.split(" ")[0]}
              </h3>
              <StudentsUnderSupervisor supervisorId={user.id as string} />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

const ContactInfo = ({ label, data }: any) => (
  <p className="mt-2 text-slate-600 ">
    <span className="font-semibold">{label + " :"}</span>
    {data}
  </p>
);
const ContactLink = ({ label, url }: any) =>
  label !== "" ? (
    <p className="mt-2 text-slate-600 ">
      <span className="font-semibold">{label + " "}: </span>
      <Anchor>
        <a href={url}>{url}</a>
      </Anchor>
    </p>
  ) : null;

const UserMaterials = ({ materials }: { materials: IMaterialOfUser[] }) => {
  return (
    <table className="w-full table-auto text-left m-4">
      <tbody>
        {materials.map((material) => (
          <tr key={material.id} className="text-slate-600">
            <td>
              <Link href={`/materials/${material.id}`}> {material.title}</Link>
            </td>
            <td>
              <Badge>{material.categories[0]?.name || ""}</Badge>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const StudentsUnderSupervisor = ({
  supervisorId,
}: {
  supervisorId: string;
}) => {
  const { isLoading, students } = useStudentsOfSpecificSupervisor({
    supervisorId,
  });

  if (isLoading) return <div>Loading...</div>;
  return (
    <SimpleGrid cols={2} mt="xl" breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
      {students.map((user) => (
        <UserInfoIcons
          key={user.id}
          contactNumber={user.contactNumber ?? ""}
          email={user.email ?? ""}
          image={user.image ?? ""}
          name={user.name ?? ""}
          title="Student"
          userId={user.id}
        />
      ))}
    </SimpleGrid>
  );
};

export default User;
