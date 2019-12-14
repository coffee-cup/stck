import styled from "@emotion/styled";
import css from "@styled-system/css";
import * as React from "react";
import Link from "./Link";

export interface Props {
  title: string;
  artist: string;
  image: string;
  link: string;
}

const shadowColor = "#00000040";

const AlbumLink = styled(Link)(
  css({
    display: "inline-block",
    textDecoration: "none",
    width: "100%",

    "&:hover": {
      opacity: 2,

      img: {
        transform: "scale(1.05)",
        boxShadow: `0 0 20px ${shadowColor}`,
      },
    },
  }),
);

const StyledAlbum = styled.div(
  css({
    display: "flex",
    alignItems: "center",
    py: 3,

    a: {
      textDecoration: "none",
    },
  }),
);

const AlbumArt = styled.img(
  css({
    maxWidth: ["10rem", "16rem"],
    boxShadow: `0 0 15px ${shadowColor}`,

    transition: "all 250ms ease-in-out",
  }),
);

const Info = styled.div(
  css({
    pl: [4, 5],
  }),
);

const Title = styled.h2(
  css({
    mb: 2,
  }),
);

const Artist = styled.span(
  css({
    mt: 0,
    fontSize: 2,
  }),
);

const Album: React.FC<Props> = props => {
  return (
    <AlbumLink to={props.link}>
      <StyledAlbum>
        <AlbumArt src={props.image} alt={`${props.title} album cover`} />
        <Info>
          <Title>{props.title}</Title>
          <Artist>{props.artist}</Artist>
        </Info>
      </StyledAlbum>
    </AlbumLink>
  );
};

export default Album;
