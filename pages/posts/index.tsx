import { GetStaticProps } from "next";
import Prismic from "@prismicio/client";
import { RichText } from 'prismic-dom';
import Link from "next/link";
import SEO from "../../src/components/SEO";
import { getPrismicClient } from "../../src/components/services/prismic";
import styles from './posts.module.scss';

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  updateAt: string;
}

interface PostsProps {
  posts: Post[];
}

interface PrismicDocumentTitle {
  type: string;
  text: string;
}
 
interface PrismicDocumentContent {
  type: string;
  text: string;
}
 
interface PrismicDocument {
  uid: string;
  last_publication_date: string;
  data: {
    title: PrismicDocumentTitle[];
    content: PrismicDocumentContent[];
  }
}

export default function Posts({ posts }: PostsProps) {
    return (
      <>
        <SEO title="Posts" />
        <main className={styles.container}>
          <div className={styles.posts}>
            {posts.map(post => (
              <Link href={`/posts/${post.slug}`} key={post.slug}>
                <a>
                  <time>{post.updateAt}</time>
                  <strong>{post.title}</strong>
                  <p>{post.excerpt}</p>
                </a>
              </Link>
            ))}
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

      const posts = response.results.map(post => {
        return {
          slug: post.uid,
          title: RichText.asText(post.data.title),
          excerpt: post.data.content.find(content => content.type === 'paragraph')?.text ?? 
          '',
          updateAt: new Date(post.last_publication_date).toLocaleDateString(
            'pt-BR', 
            {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            },
          ),
        };
      });

    return {
      props: {
        posts,
      },
      revalidate: 60 * 60 * 12, //12 horas
    };
  };