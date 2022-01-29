import styles from './odds.module.scss'
import dynamic from 'next/dynamic'
import { Key } from 'react'
import { motion } from 'framer-motion'
const Bookies = dynamic(() => import('./bookies'))

const Odds = (props: any) => {
    return (
    <div className={!props.bp ? styles.odds : styles.spacer}>
      {props.odds.map((odd: any, index: Key | null | undefined) => {
        let date = new Date(odd?.commence_time).toDateString()
        if(odd) {
            return (
                <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 'some' }}
                transition={{ duration: 0.3 }}
                variants={{
                  visible: { x: 0, opacity: 1 },
                  hidden: { x: 300, opacity: 0 }
                }}
                key={index} 
                className={styles.oddsContainer}>
                  <h2>{odd.sport_title}</h2>
                  <small>{date}</small>
                  <div className={styles.oddsTeams}>
                    <h3>{odd.away_team}</h3>
                    <strong>vs</strong>
                    <h3>{odd.home_team}</h3>
                  </div>
                  <div className={styles.oddsBookies}>
                   <Bookies odd={odd} />
                  </div>
                </motion.div>
              )
        }
      })}
    </div>
    )
}

export default Odds