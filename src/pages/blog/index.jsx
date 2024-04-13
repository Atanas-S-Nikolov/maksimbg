import styles from "@/styles/pages/blog/Blog.module.css";

import PostPreview from "@/components/blog/PostPreview"

import { posts } from "@/constants/Posts";

export default function Blog() {
  return (
    <section className={styles.blog_section}>
      {posts.map(post => (<PostPreview key={post.title} post={post} />))}
    </section>
  )
}
