import React, { useEffect, useState } from 'react'

import './App.css'
import Header from './components/Header/index.js'
import MovieRow from './components/MovieRow/index.js'
import Tmdb from './Tmdb'
import FeaturedMovie from './components/FeaturedMovie/index.js'
import Modal from './components/Modal/index.js'

function App() {

  const [movieList, setMovieList] = useState([])
  const [featuredData, setFeatureData] = useState(null)
  const [blackHeader, setBlackHeader] = useState(false)
  const [isModalVisible, setModalVisible] = useState(false)
  const [modalData, setModalData] = useState({})


  useEffect(() => {
    const loadAll = async () => {
      // Pegando a lista TOTAL

      let list = Tmdb.getHomeList();
      setMovieList(await list)

      console.log(await list)

      // Pegando o filme em destaque (featured)

      let originals = (await list).filter(i => i.slug === 'originals')
      let randomChoose = Math.floor(Math.random() * (originals[0].items.results.length - 1))
      let chosen = originals[0].items.results[randomChoose]

      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv')

      setFeatureData(await chosenInfo)

    }
    loadAll()

  }, [])

  useEffect(() => {
    const scrollListener = () => {
 
      if (isModalVisible) {
        setBlackHeader(false)
      } else {
        if (window.scrollY > 10) {
        setBlackHeader(true)
      } else {
        setBlackHeader(false)
      }
      }

      
    }

    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener)
    }
  })

  return (
    <div className='page'>

      {isModalVisible &&
              <Modal item={modalData} onClose={() => setModalVisible(false)}/>
            }

      <Header black={blackHeader}></Header>

      {featuredData &&
        <FeaturedMovie item={featuredData} />
      }

      <section className='lists'>
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} onOpen={() => setModalVisible(true)}
          setData={(state) => {setModalData(state)}}/> 
        ))}
      </section>
      <footer>

        <p>Feito com <span role='img' aria-label='amor'>💖</span> por João Martins</p>
        <p>Direitos de imagem para Netflix</p>
        <p className='last'>Dados fornecidos por <a href='https://www.themoviedb.org/'>TMDb</a></p>
      </footer>

      {movieList.length <= 0 && 
        <div className="loading">
          <img src="https://cdn.lowgif.com/small/0534e2a412eeb281-the-counterintuitive-tech-behind-netflix-s-worldwide.gif" alt="loading"></img>
        </div>
      } 

      

    </div>
  );
}

export default App;
