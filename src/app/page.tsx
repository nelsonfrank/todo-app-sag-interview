import { CreatePost } from "~/app/_components/create-post";
import { redirect } from "next/navigation";

export default async function Page() {
  redirect("/inbox");

  return;
}

async function CrudShowcase() {
  // const latestPost = await api.post.getLatest();

  return (
    <div className="w-full max-w-xs">
      <p>You have no posts yet.</p>

      <CreatePost />
    </div>
  );
}
