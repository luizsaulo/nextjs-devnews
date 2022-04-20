import { GetStaticProps } from "next";
import Link from "next/link";
import SEO from "../../src/components/SEO";

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
        <main>
          <div>
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
    

    return {
      props: {},
      revalidate: 60 * 60 * 12, //in seconds
    };
  };