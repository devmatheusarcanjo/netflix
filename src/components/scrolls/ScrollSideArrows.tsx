import { RiArrowLeftWideFill } from "react-icons/ri"

export default ScrollSideArrows({}) {
  return (<>
       <div className={styles.arrowLeft} onClick={() => handleClick('left')}>
              <RiArrowLeftWideFill size={50} />
            </div>

            <div
            className={styles.arrowRight}
            onClick={() => handleClick('right')}
          >
            <RiArrowRightWideFill size={50} />
          </div>     
  </>)
}