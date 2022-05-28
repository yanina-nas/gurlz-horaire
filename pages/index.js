import React from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import * as cheerio from 'cheerio';
import { Table, Button, Badge } from 'antd';
import 'antd/dist/antd.css';
import Link from 'next/link'
import { QuestionOutlined } from '@ant-design/icons'
import GitHubButton from 'react-github-btn'
import { parse, format } from 'date-fns'
import { fr } from 'date-fns/locale'

function Home({ entries, headers }) {
  // switch columns 2 and 4 for placing courses column mobile display
  let temp = headers[2]
  headers[2] = headers[4]
  headers[4] = temp
  
  headers[1] = {
    ...headers[1],
    onFilter: (value, record) => record.Formation.indexOf(value) === 0,
    sortDirections: ['descend']
  }
  temp = headers[3]
  headers[3] = headers[5]
  headers[5] = temp

  for(let columnIndex = 2; columnIndex < 4; columnIndex++){
    headers[columnIndex] = {
      ...headers[columnIndex],
      onFilter: (value, record) => record[headers[columnIndex].dataIndex].indexOf(value) === 0,
      sortDirections: ['descend']
    }
  }
  for(let columnIndex = 5; columnIndex < 7; columnIndex++){
    headers[columnIndex] = {
      ...headers[columnIndex],
      onFilter: (value, record) => record[headers[columnIndex].dataIndex].indexOf(value) === 0,
      sortDirections: ['descend']
    }
  }
  

  const data = React.useMemo(
    () => entries, [entries]
  )

  const columns = React.useMemo(
    () => headers, [headers]
  )

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Interface3 Horaire</title>
        <meta name="description" content="Interface3 schedule aka GURLZ horaire" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GitHubButton 
        href="https://github.com/yanina-nas/gurlz-horaire/issues" 
        data-icon="octicon-issue-opened" 
        data-size="large" 
        aria-label="Issue yanina-nas/gurlz-horaire on GitHub"
        >
          {"Report an issue"}
      </GitHubButton>
      <GitHubButton 
        href="https://github.com/yanina-nas/gurlz-horaire" 
        data-icon="octicon-star" 
        data-size="large" 
        aria-label="Star yanina-nas/gurlz-horaire on GitHub"
      >
        {"Give a star"}
      </GitHubButton>
      <main className={styles.main}>
      <h1 className={styles.title}>
        {"Welcome to "}<a href="https://www.interface3.be">{"Interface3"}</a><br/>
      </h1>
      <Badge.Ribbon className={styles.ribbon} text="beta" color="magenta">
        <h1 className={styles.title}>
          {"Horaire"}
        </h1>
      </Badge.Ribbon>
      <p className={styles.description}>
        <code className={styles.code}>
          {"Questions ? Check the FAQ "}&#8594;
        </code>
        <Link href="/faq">
          <Button shape="circle" icon={<QuestionOutlined />} size="large" />
        </Link>
      </p>
      <Table onChange={onChange} columns={columns} dataSource={data} />
      </main>
      <footer className={styles.footer}>
        <code>
          {"Try not. Do or do not. There is no try."}
        </code>
      </footer>
    </div>
  )
}

export async function getServerSideProps() {
  const response = await fetch('https://interface3.odoo.com/horaire-tv/aaaa-bbbb-cccc-dddd-eeee');
  const htmlString = await response.text();
  const $ = cheerio.load(htmlString)

  let tdContent = [];
  $('td').each(
    function(i, e) {
      let j = i % 7;
      let newEntry = $(this).text().trim();
      tdContent[j] = tdContent[j] ? [...tdContent[j], newEntry] : [newEntry];
    }
  );

  let entries = [];
  let headers = [];

  for(let index = 1; index < tdContent[0].length; index++) {
    entries.push({
      key: `${index-1}`,
      [tdContent[0][0]]: tdContent[0][index],
      [tdContent[1][0]]: tdContent[1][index],
      [tdContent[2][0]]: tdContent[2][index],
      [tdContent[3][0]]: tdContent[3][index],
      [tdContent[4][0]]: tdContent[4][index],
      [tdContent[5][0]]: tdContent[5][index],
      [tdContent[6][0]]: tdContent[6][index],
    })
  }

  // extrapolation of dates
  for(let index = 0; index < entries.length; index++) {
    if (entries[index][tdContent[0][0]] === '') {
      entries[index][tdContent[0][0]] = entries[index-1][tdContent[0][0]]
    }
  }

  
  // extrapolation of formations
  for(let index = 0; index < entries.length; index++) {
    if (entries[index][tdContent[1][0]] === '') {
      entries[index][tdContent[1][0]] = entries[index-1][tdContent[1][0]]
    }
  }

  for(let index = 0; index < tdContent.length; index++) {
  headers.push({
    title: tdContent[index][0], dataIndex: tdContent[index][0],
  })
  }
  const uniqueFormations = tdContent[1].unique()
  const uniqueGroups = tdContent[3].unique()
  const uniqueCourses = tdContent[4].unique()
  const uniqueFormateurs = tdContent[5].unique()
  const uniqueSalles = tdContent[6].unique()

  // del title and ''
  uniqueFormations.removeEmptyString()
  uniqueFormations.removeElem(tdContent[1][0])
  uniqueGroups.removeElem(tdContent[3][0])
  uniqueGroups.removeEmptyString()
  uniqueCourses.removeEmptyString()
  uniqueCourses.removeElem(tdContent[4][0])
  uniqueFormateurs.removeEmptyString()
  uniqueFormateurs.removeElem(tdContent[5][0])
  uniqueSalles.removeEmptyString()
  uniqueSalles.removeElem(tdContent[6][0])

  let formationFilter = []
  formationFilter.formatAsTableFilter(uniqueFormations)
  let groupFilter = []
  groupFilter.formatAsTableFilter(uniqueGroups)
  let courseFilter = []
  courseFilter.formatAsTableFilter(uniqueCourses)
  let formateurFilter = []
  formateurFilter.formatAsTableFilter(uniqueFormateurs)
  let salleFilter = []
  salleFilter.formatAsTableFilter(uniqueSalles)

  headers[1] = {
    ...headers[1], 
    filters : formationFilter
  }
  headers[3] = {
    ...headers[3], 
    filters : groupFilter
  }
  headers[4] = {
    ...headers[4], 
    filters : courseFilter
  }
  headers[5] = {
    ...headers[5], 
    filters : formateurFilter
  }
  headers[6] = {
    ...headers[6], 
    filters : salleFilter
  }
  for(let entryIndex = 0; entryIndex < entries.length; entryIndex++ ) {
    entries[entryIndex][tdContent[0][0]] = format(
      parse(
        entries[entryIndex][tdContent[0][0]], 
        'MM/dd/yyyy', 
        new Date()
      ), 
      "PP",
      { locale: fr }
    )
  }

  return { props: { entries, headers }}
}

export default Home
