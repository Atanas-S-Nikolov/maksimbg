import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import Link from 'next/link';

import { useState } from 'react';

const DEFAULT_ELEVATION = 3;

export default function Post({ post }) {
  const { title, image, description, date } = post;
  const [elevation, setElevation] = useState(DEFAULT_ELEVATION);

  function handleMouseEnter() {
    setElevation(10);
  }

  function handleMouseLeave() {
    setElevation(DEFAULT_ELEVATION);
  }

  return (
    <Link href={`/blog/${title}`}>
      <Card
        elevation={elevation}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <CardMedia
          component="img"
          image={image.src}
          height={600}
          alt={title}
        />
        <CardContent>
          <Typography variant='h4'>{title}</Typography>
          <Typography paragraph>{description}</Typography>
          <Typography color="text.secondary">{date}</Typography>
        </CardContent>
      </Card>
    </Link>
  )
}
