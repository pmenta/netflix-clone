/* eslint-disable import/no-anonymous-default-export */
import React from 'react'
import './Modal.css'

export default ({item, onClose}) => {

    let genres = []
    for(let i in item.genres) {
        genres.push(item.genres[i].name)
    }

    let firstDate = new Date(item.first_air_date)

    return (
        <div className='overlay' onClick={onClose}>
            <div className='modal--content'>
                <div className='modal--trailer'>
                    <img className='trailer--block' src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`} alt={item.name}></img>
                </div>
                <div className='modal--info'>
                    <div className='info--left'>
                            <div className='info--top'> 
                                <div className='info--point'>{item.vote_average} pontos</div>
                                <div className='info--year'>{firstDate.getFullYear()}</div>
                                {/* <div className='info--seasons'>{item.number_of_seasons} temporada{item.number_of_seasons !== 1 ? 's' : ''}</div> */}
                            </div>
                        <div className='info--name'>{item.name}</div>
                        <div className='info--name'>{item.title}</div>
                        <div className='info--description'>{item.overview}</div>
                    </div>
                    {/* <div className='info--right'>
                        <strong>Gêneros: </strong>{genres.join(', ')}
                    </div> */}
                </div>
            </div>
        </div>
    )
}