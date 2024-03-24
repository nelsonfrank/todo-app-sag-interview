import { CreatePost } from "~/app/_components/create-post";
import { api } from "~/trpc/server";
import { redirect } from "next/navigation";

export default async function Page() {
  const hello = await api.post.hello({ text: "from tRPC" });

  redirect("/inbox");

  return;
}

async function CrudShowcase() {
  const latestPost = await api.post.getLatest();

  return (
    <div className="w-full max-w-xs">
      {latestPost ? (
        <p className="truncate">Your most recent post: {latestPost.name}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}

      <CreatePost />
    </div>
  );
}
