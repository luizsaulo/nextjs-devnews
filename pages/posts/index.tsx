import { GetStaticProps } from "next";
import Prismic from "@prismicio/client";
import Link from "next/link";
import SEO from "../../src/components/SEO";
import { getPrismicClient } from "../../src/components/services/prismic";
import styles from './posts.module.scss';

interface Post {
  id: string;
  title: string;
}

interface PostsProps {
  posts: Post[];
}

export default function Posts() {
    return (
      <>
        <SEO title="Posts" />
        <main className={styles.container}>
          <div className={styles.posts}>
            <Link href="#">
              <a>
                <time>20 de abril de 2022</time>
                <strong>Título</strong>
                <p>Parágrafo</p>
              </a>
            </Link>
          </div>
        </main>      
      </>
    );
  }
  
  export const getStaticProps: GetStaticProps = async () => {  
    const prismic = getPrismicClient();

    const response = await prismic.query(
      [Prismic.predicates.at('document.type', 'post')], 
      {
      fetch: ['post.title', 'post.content'],
      },
    );

      console.log(response);

    return {
      props: {},
      revalidate: 60 * 60 * 12, //12 horas
    };
  };