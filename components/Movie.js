// @flow
import React from "react";
import Head from "next/head";
import { gql, graphql } from "react-apollo";
import type { MovieT } from "../types";
import Description from "./Description";
import Poster from "./Poster";

type Props = { data: { Movie: MovieT } };

function Movie({ data: { Movie } }: Props) {
  if (Movie) {
    return (
      <section
        style={
          Movie.backdrop
            ? {
                backgroundImage: `url('https://image.tmdb.org/t/p/w1280${Movie.backdrop}')`
              }
            : { backgroundColor: "#333" }
        }
      >
        <Head>
          <title>{Movie.title} | Movie List</title>
        </Head>
        <div className="wrapper">
          <Poster poster={Movie.poster} title={Movie.title} />
          <Description id={Movie.id} />
        </div>
        <style jsx>{`
          section {
            background-position: center center;
            background-repeat: no-repeat;
            background-size: cover !important;
            display: flex;
            flex: 1 1 67%;
          }

          .wrapper {
            align-items: flex-end;
            background-color: rgba( 0, 0, 0, .5 );
            display: flex;
            flex: 1;
            padding: .5rem;
          }
        `}</style>
      </section>
    );
  }

  return (
    <section>
      Loading...
      <style jsx>{`
        section {
          align-items: center;
          display: flex;
          flex-grow: 1;
          justify-content: center;
        }
      `}</style>
    </section>
  );
}

const movie = gql`
  query Movie($id: ID!) {
    Movie(id: $id) {
      id
      backdrop
      poster
      title
    }
  }
`;

export default graphql(movie, {
  options: ({ id }) => ({ variables: { id } }),
  props: ({ data }) => ({ data })
})(Movie);
