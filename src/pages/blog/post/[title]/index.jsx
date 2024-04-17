import Post from "@/components/blog/Post";
import { posts } from "@/constants/Posts";

export async function getServerSideProps(context) {
  const post = posts.find(p => p.title == context.params.title);
  return { props: { post } };
}

export default function PostPage({ post }) {
  return (
    <>
      <Post post={post} />
    </>
  )
}
