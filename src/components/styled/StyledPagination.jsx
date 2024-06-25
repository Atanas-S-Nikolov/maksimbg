import { createQueryString } from "@/utils/URLUtils";
import { styled, useMediaQuery } from "@mui/material";

import Pagination from "@mui/material/Pagination";
import { useRouter, useSearchParams } from "next/navigation";

const CustomPagination = styled(Pagination)(({
    marginTop: "1em",
}));

export default function StyledPagination({ pagesCount }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isMobile = useMediaQuery("(max-width: 350px)", {
    defaultMatches: false,
  });
  const size = isMobile ? "small" : "medium";
  const currentPage = parseInt(searchParams.get("page")) || 1;

  async function handleChange(event, value) {
    const pageQueryString = createQueryString("page", value, searchParams);
    router.push(`?${pageQueryString}`);
  }

  return (
    <CustomPagination
      count={pagesCount}
      size={size}
      page={currentPage}
      onChange={handleChange}
      color="secondary"
    />
  );
}
