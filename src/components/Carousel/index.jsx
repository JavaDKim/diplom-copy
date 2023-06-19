import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import "./carousel.css"
import { carouselArray } from "../../assets/mainPosts"

function ControlledCarousel() {
	const [index, setIndex] = useState(0);

	const handleSelect = (selectedIndex) => {
		setIndex(selectedIndex);
	};

	return (
		<Carousel activeIndex={index} onSelect={handleSelect} className='carousel'>
			{carouselArray?.map(e => <Carousel.Item key={e.id}>
				<img
					className="d-block w-100"
					src={require(`../../assets/images/${e.img}`)}
					alt="First slide"
				/>
				<Carousel.Caption >
					<h4 className="carouselTitle">{e.title}</h4>
					<span className="carouselText">{e.text}</span>
				</Carousel.Caption>
			</Carousel.Item>)}
		</Carousel>
	);
}

export default ControlledCarousel;