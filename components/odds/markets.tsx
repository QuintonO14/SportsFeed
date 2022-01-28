import styles from './odds.module.scss'
import { Key } from 'react'

const Markets = (props: { bookie: { markets: any[] } }) => {
    return (
        <>
        {props.bookie.markets.map((market: any, index: Key | null | undefined) => {
            return (
                <div key={index} className={styles.outcomes}>
                {market.key === 'h2h' && (
                    market.outcomes.map((out: any, index: Key | null | undefined) => {
                    return (
                    <div key={index}>
                        <strong>{out.name}</strong>
                        <p>{out.price}</p>
                    </div>
                    )
                    })
                )}
                {market.key === 'spreads' && (
                    market.outcomes.map((out: any, index: Key | null | undefined) => {
                    return (
                    <div key={index} className={styles.outcomes}>
                        <strong>{out.name}</strong>
                        <p>{out.point}</p>
                    </div>
                    )
                    })
                )}
                {market.key === 'totals' && (
                    market.outcomes.map((out: any, index: Key | null | undefined) => {
                    return (
                    <div key={index} className={styles.outcomes}>
                        <strong>{out.name}</strong>
                        <p>{out.point}</p>
                    </div>
                    )
                    })
                )}
                </div>
            )
        })}
        </>
    )
}

export default Markets