import Post from "@/components/blog/Post";
import { getPost } from "@/services/BlogPostService";

export async function getServerSideProps(context) {
  const post = await getPost(context.params.url);
  return { props: { post } };
}

export default function PostPage({ post }) {
  return (
    <>
      <Post post={post} />
    </>
  )
}
