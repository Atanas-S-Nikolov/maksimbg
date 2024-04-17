import styles from "@/styles/pages/blog/Blog.module.css";

import PostPreview from "@/components/blog/PostPreview"
import CreatePostDialog from "@/components/blog/CreatePostDialog";

import AddIcon from '@mui/icons-material/Add';

import { posts } from "@/constants/Posts";

import { useState } from "react";
import BottomIconButtonWithTooltip from "@/components/utils/BottomIconButtonWithTooltip";

export default function Blog() {
  const [dialogOpen, setDialogOpen] = useState(false);

  function handleDialogOpen(event) {
    event.preventDefault();
    setDialogOpen(true);
  }

  function handleDialogClose(event) {
    event.preventDefault();
    setDialogOpen(false);
  }

  return (
    <section className={styles.blog_section}>
      {posts.map(post => (<PostPreview key={post.title} post={post} />))}
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
      <CreatePostDialog open={dialogOpen} onClose={handleDialogClose} />
    </section>
  )
}
