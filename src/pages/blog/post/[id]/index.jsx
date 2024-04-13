import Post from "@/components/blog/Post";
import { posts } from "@/constants/Posts";

export async function getServerSideProps(context) {
  const post = posts.find(p => p.id == context.params.id);
  return { props: { post } };
}

export default function PostPage({ post }) {
  return (
    <>
      <Post post={post} />
    </>
  )
}
