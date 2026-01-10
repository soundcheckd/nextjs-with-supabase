import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  // Redirect to the profile page
  return redirect("/protected/my-profile");
}
