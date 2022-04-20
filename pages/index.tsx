import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import SEO from "../src/components/SEO";
import styles from '../styles/home.module.scss';


export default function Home() {
   return (
    <>
      <SEO title='Dev News!' excludeTitleSuffix />
      
      <main className={styles.content}>
        <section className={styles.section}>
          <span>Olá Dev!</span>
          <h1>
            Bem vindos ao <br />
            <span>Dev</span>News!
          </h1>
          <p>
            Um blog com conteúdo extremamente <br />
            <span>relevante para o seu aprendizado.</span>
          </p>          
        </section>

        <img src="/home.svg" alt="Home image" />
      </main>
    </>
  )
}
