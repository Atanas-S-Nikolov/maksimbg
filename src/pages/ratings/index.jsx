import AdminRatingCard from "@/components/ratings/AdminRatingCard";
import StyledPagination from "@/components/styled/StyledPagination";
import { NOT_FOUND_PAGE_URL } from "@/constants/URLConstants";

import { getRatings } from "@/services/RatingService";
import { styled } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export async function getServerSideProps(context) {
  const { page, limit } = context.query;
  const initialRatings = await getRatings(page, limit);
  return { props: { initialRatings } };
}

const StyledSection = styled("section")({
  display: "flex",
  flexWrap: "wrap",
  gap: "1em",
  padding: "1em",
  "@media (max-width: 1200px)": {
    flexDirection: "column",
    alignItems: "stretch",
  },
});

export default function Ratings({ initialRatings }) {
  const [ratings, setRatings] = useState(initialRatings);
  const { docs, totalPages } = ratings;
  const router = useRouter();
  const { page, limit } = router.query;

  useEffect(() => {
    async function setFetchedRatings() {
      const response = await getRatings(page, limit);
      if (page > response.totalPages) {
        router.replace(NOT_FOUND_PAGE_URL);
        return;
      }
      setRatings(response);
    }
      setFetchedRatings();
  }, [page, limit, router]);

  async function handleRatingUpdate() {
    setRatings(await getRatings(page, limit));
  }

  return (
    <>
      <StyledSection>{docs.map((rating) => (
          <AdminRatingCard
            key={rating.url}
            rating={rating}
            ratingsCount={docs.length}
            onRatingsUpdate={handleRatingUpdate}
            elevation={4}
          />
        ))}</StyledSection>
      <StyledPagination pagesCount={totalPages} />
    </>
  );
}
