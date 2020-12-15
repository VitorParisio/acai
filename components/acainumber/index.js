import Image from 'next/image'
import styles from './style.module.css'

export default function AcaiNumber({addNumber, currentNumber, removeNumber}){
   
    return(
        <div className={styles.products}>
            <Image src="/assets/img/images.jpg" width={200} height={300}/>
            <button onClick={addNumber} className={styles.btn_number}>+</button>
            <input value={currentNumber} readOnly className={styles.currentnumber}/>
            <button onClick={removeNumber} className={styles.btn_number}>-</button>
        </div>
    )
}