import styles from "@/styles/pages/blog/Blog.module.css";

import PostPreview from "@/components/blog/PostPreview";
import CreatePostDialog from "@/components/blog/CreatePostDialog";

import AddIcon from "@mui/icons-material/Add";

import { useState } from "react";
import BottomIconButtonWithTooltip from "@/components/utils/BottomIconButtonWithTooltip";
import { useSelector } from "react-redux";
import { getAllPosts } from "@/services/BlogPostService";
import Alert from "@mui/material/Alert";

export async function getServerSideProps() {
  const posts = await getAllPosts();
  return { props: { posts } };
}

export default function Blog({ posts }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.authentication);
  const arePostsEmpty = posts.length === 0;

  function handleDialogOpen(event) {
    event.preventDefault();
    setDialogOpen(true);
  }

  function handleDialogClose(event) {
    event.preventDefault();
    setDialogOpen(false);
  }

  return (
    <>
      {arePostsEmpty ? (
        <Alert severity="info" color="secondary">
          Няма качени постове
        </Alert>
      ) : null}
      <section className={styles.blog_section}>
        {posts.map((post) => (
          <PostPreview key={post.title} post={post} />
        ))}
        {isLoggedIn ? (
          <BottomIconButtonWithTooltip
            aria-label="add post"
            onClick={handleDialogOpen}
            tooltipProps={{
              title: "Добави пост",
              arrow: true,
              placement: "top-start",
            }}
          >
            <AddIcon />
          </BottomIconButtonWithTooltip>
        ) : null}

        {dialogOpen ? (
          <CreatePostDialog open={dialogOpen} onClose={handleDialogClose} />
        ) : null}
      </section>
    </>
  );
}
