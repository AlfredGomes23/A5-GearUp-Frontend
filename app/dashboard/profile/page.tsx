import { notFound } from "next/navigation";
import { getUser } from "@/services/getUser";
import ProfileForm from "./_components/ProfileForm";

const ProfilePage = async () => {
  const userRes = await getUser();

  if (!userRes?.success || !userRes?.data) notFound();

  return <ProfileForm user={userRes.data} />;
};

export default ProfilePage;
