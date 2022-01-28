import styles from './odds.module.scss'
import { Key } from 'react'
import Markets from './markets'
import Carousel from 'react-material-ui-carousel'

const Bookies = (props: any) => {
    return (
        <Carousel
        animation='slide'
        autoPlay={false}
        className={styles.carousel}
        navButtonsWrapperProps={{style: {top: 'unset', bottom: '35%', padding: '0 1rem'}}}
        navButtonsProps={{style: {color: '#E1811F'}}}
        indicatorContainerProps={{style: {padding: '0.5rem', paddingTop: '1rem',
        position: 'absolute', bottom: 0}}}
        indicatorIconButtonProps={{style: {padding: 0, transform: 'scale(0.5)'}}}
        activeIndicatorIconButtonProps={{style: {color: '#E1811F'}}} 
        >
            {props.odd.bookmakers.filter((a: any) => a.key !== 'lowvig' && a.key !== 'mybookieag'
            && a.key !== 'williamhill_us' && a.key !== '' && a.key !== 'intertops'
            && a.key !== 'gtbets')
            .map((bookie: any, index: Key | null | undefined) => {
            let date = new Date(bookie.last_update).toLocaleTimeString()
                return (
                <div key={index} className={styles.bookie}>
                    <h4>{bookie.title}</h4>
                    <small>Last updated: {date}</small>
                    <Markets bookie={bookie} />
                </div>
                )
            })}
        </Carousel>
    )

}

export default Bookies