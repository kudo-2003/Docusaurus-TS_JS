import React from 'react';
import Layout from '@theme/Layout'; // ✅ Correct import for Layout
import ThemedImage from '@theme/ThemedImage';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import {ThemeClassNames, useWindowSize} from '@docusaurus/theme-common';

import Admonition from '@theme/Admonition';


import infoData from '../data/jsons/information.json';
import styles from './introduction.module.css';

export default function Introduction() {
  return (
    <Layout>
      <Head>
        <title>Introduction</title>
        <meta name="description" content="Welcome to my Docusaurus introduction page" />
      </Head>
      <main className={styles.mainContent}>
        <h1 className={styles.title}>Hello everyone 👋</h1>
        <p className={styles.description}>
          This is my introduction page built with React inside Docusaurus.
        </p>
   
<div className={styles.imageRow}>
  <ThemedImage
    alt="Learning English Desktop"
    className={styles.responsiveImage}
    sources={{
      light: '/img/undraw_docusaurus_tree.svg',
      dark: '/img/undraw_docusaurus_tree.svg',
    }}
  />

  <ThemedImage
    alt="Learning English Mobile"
    className={styles.responsiveImage}
    sources={{
      light: '/img/undraw_docusaurus_react.svg',
      dark: '/img/undraw_docusaurus_react.svg',
    }}
  />
    <ThemedImage
    alt="Learning English Mobile"
    className={styles.responsiveImage}
    sources={{
      light: '/img/undraw_docusaurus_mountain.svg',
      dark: '/img/undraw_docusaurus_mountain.svg',
    }}
  />
  
</div>

       {infoData.admonitions.map((item, index) => (
  <Admonition key={index} type={item.type} title={item.title} icon={item.icon}>
    <p>{item.content.en}</p>
    <p>({item.content.vi})</p>
    <audio controls>
      <source src={item.audio} type="audio/mpeg" />
      Trình duyệt của bạn không hỗ trợ audio.
    </audio>
  </Admonition>
))}

        <Link className={styles.link} to="/docs/intro">Go to Docs</Link>
      </main>
    </Layout>
  );
}