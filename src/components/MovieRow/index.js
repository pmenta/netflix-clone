/* eslint-disable array-callback-return */
/* eslint-disable import/no-anonymous-default-export */
import React, {useState, useEffect} from 'react'
import './MovieRow.css'

import NavigateBeforeRoundedIcon from '@material-ui/icons/NavigateBeforeRounded';
import NavigateNextRoundedIcon from '@material-ui/icons/NavigateNextRounded';

export default ({title, items, onOpen, setData}) => {

    const [modalData, setModalData] = useState({})

    useEffect(() => {
        setData(modalData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[modalData])

    const [scrollX, setScrollX] = useState(0)

    const handleLeftArrow = () => {
        let x = scrollX + Math.round(window.innerWidth / 2)
        if (x > 0) {
            x = 0
        }
        setScrollX(x)
    }  

    const handleRightArrow = () => {
        let x = scrollX - Math.round(window.innerWidth / 2)
        let listW = items.results.length * 150
        if ((window.innerWidth - listW) > x) {
            x = (window.innerWidth - listW) - 75
        }
        setScrollX(x)
    }  

    let setModal = async (info) => {
        setModalData(info, setData(modalData, onOpen()))
 
    }

    return (
        <div className='movieRow'>
            <h2>{title}</h2>

            <div className='movieRow--left' onClick={handleLeftArrow}>
                <NavigateBeforeRoundedIcon style={{fontSize: 50}}/>
            </div>
            <div className='movieRow--right' onClick={handleRightArrow} >
                <NavigateNextRoundedIcon style={{fontSize: 50}}/>
            </div>


            <div className='movieRow--listarea'>
                <div className='movieRow--list' style={{
                marginLeft: scrollX,
                width: items.results.length * 150
            }}>
                    {items.results.length > 0 && items.results.map((item, key) => ( // TROCA 
                        <div key={key} className={`movieRow--item ${item.id}`}>
                            <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.name} key={key} onClick={() => {
                                setModal(item)
                                }}/>
                        </div>
                    ))}
                </div>
            </div>

           

        </div>
    )
}