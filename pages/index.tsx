import type { GetServerSideProps, NextPage } from 'next'
import styles from '../styles/Home.module.scss'
import dynamic from 'next/dynamic'
import axios from 'axios'
import { useState } from 'react'
import { FaBars } from 'react-icons/fa'
import useMediaQuery from '../hooks/useMediaQuery'
import Image from 'next/image'
const Article = dynamic(() => import('../components/news/article'))
const Odds = dynamic(() => import('../components/odds/odds'))

interface Source {
  id: string,
  name: string, 
}

interface Article {
  map(arg0: any): import("react").ReactNode
  author? : string,
  content? : string,
  description? : string,
  publishedAt: Date,
  source: Source,
  title: string,
  url?: string,
  urlToImage?: string
}

interface Odds {
  [x: string]: any
  id: string,
  sport_key: string,
  sport_title: string,
  commence_time?: Date,
  home_team: string,
  away_team: string,
  bookmakers?: [],
}

const Home: NextPage<{news: Article, odds: Odds}> = ({news, odds}) => {
  const [articles, setArticles] = useState(news)
  const [toggled, setToggled] = useState(false)
  const [switchedTabs, setTab] = useState('news')
  const breakpoint = useMediaQuery(1000)
  const changeTab = (tab: string) => {
    setToggled(false)
    setTab(tab)
  }

  return (
    <div className={styles.app}>
      <div className={styles.navbar}>
        <div>
        <Image src="/logo.png" alt="logo" width="100px" height="50px" className={styles.logo} />
        </div>
        <div style={toggled === true ? {display: 'block'} : undefined}>
          <a href="#" onClick={() => changeTab('news')}>News</a>
          <a href="#" onClick={() => changeTab('odds')}>Odds</a>
        </div>
      <FaBars className={styles.bars}
       onClick={() => setToggled(!toggled)} />
      </div>
     
      { breakpoint ? (
          <>
          {switchedTabs === 'news' && <Article articles={articles} bp={breakpoint} />}
          {switchedTabs === 'odds' && <Odds odds={odds} bp={breakpoint} />}
          </>
      ) : (
        <div className={styles.container} id="container">
        <Article articles={articles} />
        <Odds odds={odds}  />
        </div>
      )}
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async(context) => {
  const apiKey = process.env.ODDS_KEY
  const regions = 'us'
  const markets = 'h2h,spreads,totals'
  const oddsFormat = 'american'
  const dateFormat = 'iso'
  let odds
  const news: Article = await axios('https://newsapi.org/v2/top-headlines', {
      method: 'GET',
      params: {
        apiKey: process.env.NEWS_KEY,
        sources: `bbc-sport,bleacher-report,espn,espn-cric-info,football-italia,
        four-four-two,fox-sports,nfl-news,nhl-news,talksport,the-sport-bible`,
        pageSize: 25
      }
  }).then((res) => {
    return res.data.articles
  }).catch((err) => {
    return err
  })

  if(news) {
    odds = await axios('https://api.the-odds-api.com/v4/sports/upcoming/odds', {
    params: {
      apiKey,
      regions,
      markets,
      oddsFormat,
      dateFormat
    }
    }).then(response => {
      console.log('Remaining requests', response.headers['x-requests-remaining'])
      console.log('Used requests', response.headers['x-requests-used'])
      response.data.length = 15
      return response.data
    })
  }

  return {
    props: {
      odds,
      news
    }
  }
}