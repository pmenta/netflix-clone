/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable import/no-anonymous-default-export */
import React from 'react'
import './FeaturedMovie.css'

export default ({ item }) => {

    let firstDate = new Date(item.first_air_date)

    let genres = []
    for(let i in item.genres) {
        genres.push(item.genres[i].name)
    }

    return (
        <section className='featured' style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`
        }}>
            <div className='featured--vertical'>
                <div className='featured--horizontal'>
                    <div className='featured--name'>{item.name}</div>
                    <div className='featured--info'>
                        <div className='info--point'>{item.vote_average} pontos</div>
                        <div className='info--year'>{firstDate.getFullYear()}</div>
                        <div className='info--seasons'>{item.number_of_seasons} temporada{item.number_of_seasons !== 1 ? 's' : ''}</div>
                    </div>
                    <div className='featured--description'>
                        {item.overview}
                    </div>
                    <div className='featured--buttons'>
                        <a href={`/watch/${item.id}`} className='button--watch'>Assistir </a>
                        <a href={`/list/add/${item.id}`} className='button--add'>+ Minha lista</a>
                    </div>
                    <div className='featured--genres'>
                        <strong>Gêneros: </strong>{genres.join(', ')}
                    </div>
                </div>
            </div>
        </section>
    )
}