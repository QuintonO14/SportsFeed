import { Key } from 'react'
import styles from './news.module.scss'
import { HiArrowNarrowRight } from 'react-icons/hi'
import { motion } from 'framer-motion'

const Article = (props: any) => {
    return (
        <div className={!props.bp ? styles.news : styles.spacer}>
         {props.articles.map((article: any, index: Key | null | undefined) => {
        let date = new Date(article.publishedAt).toDateString()
        return (
          <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 'some' }}
          transition={{ duration: 0.3 }}
          variants={{
            visible: { opacity: 1, x: 0 },
            hidden: { opacity: 0, x: -300 }
          }}
          key={index} 
          className={styles.article}>
            <h2>{article.title}</h2>
            <small>{date} {article.author}</small>
            <p>{article.description}</p>
            <img 
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src="/placeholder.png"
            }}
            src={article.urlToImage} alt="img" />
            <a href={article.url}>Visit <HiArrowNarrowRight style={{marginLeft: '0.5rem'}}/></a>
          </motion.div>
        )
      })}
        </div>
    )
}

export default Article