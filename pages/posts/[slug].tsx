import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { RichText } from 'prismic-dom';
import { getPrismicClient } from "../../src/components/services/prismic";
import SEO from "../../src/components/SEO";
import styles from './post.module.scss';
 
interface PostProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  }
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
 
export default function Post({ post }: PostProps) {
  const router = useRouter();
  if (router.isFallback) {
    return <p>Loading...</p>
  }
  return (
    <>
       <SEO title="Post" />
        <main className={styles.container}>
          <article className={styles.post}>
            <h1>{post.title}</h1>
            <time>{post.updatedAt}</time>
            <div className={styles.content} dangerouslySetInnerHTML={{ __html: post.content}} />            
          </article>
        </main> 
    </>
  );
}
 
export const getStaticPaths: GetStaticPaths = async () => {  
  return {
    paths: [],
    fallback: true,
  };
};
 
export const getStaticProps: GetStaticProps = async context => {
  const {slug} = context.params;
  const prismic = getPrismicClient();
  const response = await prismic.getByUID('post', String(slug), {})
  const document = response as PrismicDocument;
  const post = {
    slug,
    title: RichText.asText(document.data.title),
    content: RichText.asHtml(document.data.content),
    updateAt: new Date(document.last_publication_date).toLocaleDateString(
      'pt-BR', 
      {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      },
    ),
  };
  return {
    props: {
      post,
    },
    revalidate: 60 * 60 * 12, //12 horas
  };
};