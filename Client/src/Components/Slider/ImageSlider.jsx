import React from 'react'
import {Carousel} from 'react-bootstrap';

import FormTable from '../Images/FormTable.svg';
import FormRocket from '../Images/FormRocket.svg';
import SignupPage from '../Images/SignupPage.svg';
function ImageSlider() {
    return (
        <div>
            <Carousel>
                <Carousel.Item>
                    <img src={FormTable} width='100%' height='300rem' />
                </Carousel.Item>
                <Carousel.Item>
                    <img src={FormRocket} width='100%' height='300rem' />
                </Carousel.Item>
                <Carousel.Item>
                    <img src={SignupPage} width='100%' height='300rem' />
                </Carousel.Item>
            </Carousel>
        </div>
    )
}

export default ImageSlider
