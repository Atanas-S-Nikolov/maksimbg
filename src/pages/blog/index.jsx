import PostPreview from "@/components/blog/PostPreview";
import PostFormDialog from "@/components/blog/PostFormDialog";
import BottomIconButtonWithTooltip from "@/components/utils/BottomIconButtonWithTooltip";

import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";

import AddIcon from "@mui/icons-material/Add";

import { useState } from "react";
import { useSelector } from "react-redux";
import { getAllPosts } from "@/services/BlogPostService";
import { INFO_SEVERITY } from "@/constants/SeverityConstants";

export async function getServerSideProps() {
  const serverPosts = await getAllPosts();
  return { props: { serverPosts } };
}

export default function Blog({ serverPosts }) {
  const [posts, setPosts] = useState(serverPosts);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.authentication);
  const hasPosts = posts.length > 0;

  function handleDialogOpen(event) {
    event.preventDefault();
    setDialogOpen(true);
  }

  function handleDialogClose(event) {
    event.preventDefault();
    setDialogOpen(false);
  }

  async function handlePostUpdate() {
    setPosts(await getAllPosts());
  }

  return (
    <>
      {!hasPosts ? (
        <Alert severity={INFO_SEVERITY} color="secondary">
          Няма качени постове
        </Alert>
      ) : null}
      <Grid container spacing={2} columns={{ xs: 4, sm: 6, md: 24 }}>
        {posts.map((post) => (
          <Grid item key={post.title} xs={7}>
            <PostPreview post={post} />
          </Grid>
        ))}
      </Grid>
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
        <PostFormDialog
          open={dialogOpen}
          onPostUpdate={handlePostUpdate}
          onClose={handleDialogClose}
        />
      ) : null}
    </>
  );
}
