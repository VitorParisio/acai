import styles from './style.module.css'

export default function ClientForm(){
    return(
        <div className={styles.clientform}>
            <label htmlFor="name">
                <input name="name" placeholder="Nome: " className={styles.clientdata}/>
            </label>
			<label htmlFor="email">
                <input name="email" placeholder="Email: " className={styles.clientdata}/>
            </label>
			<label htmlFor="address">
                <input name="address" placeholder="Endereço: " className={styles.clientdata}/>
            </label>
			<label htmlFor="city">
                <input name="city" placeholder="Cidade: " className={styles.clientdata}/>
            </label>
			<label htmlFor="state">
                <input name="state" placeholder="Estado: " className={styles.clientdata}/>
            </label>
			<label htmlFor="postal_code">
                <input name="postal_code" placeholder="Código postal: " className={styles.clientdata}/>
            </label>
        </div>
    )
}