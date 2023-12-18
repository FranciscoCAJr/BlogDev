import React from 'react'
import { Link } from 'react-router-dom'
import styles from './About.module.css'

const About = () => {
  return (
    <>
      <div className={styles.about}>
        <h2>Sobre o Blog <span>DEV</span></h2>
        <p>
          Este projeto é um blog que utiliza React para
           o front-end e Firebase para o back-end.
        </p>
        <Link to="/post/create" className={styles.btn}>
          Criar Post
        </Link>
      </div>
    </>
  )
}

export default About