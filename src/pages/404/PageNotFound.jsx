import React, { useEffect } from 'react';
import './Page404.css';
import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom";



const PageNotFound = () => {

	const navigate = useNavigate();

	function redirectToHome() {
		navigate("/");
	}
	useEffect(() => {
		const animate = () => {
			let lFollowX = 0;
			let lFollowY = 0;
			let x = 0;
			let y = 0;
			const friction = 1 / 30;

			const img = document.querySelector('.page img');

			const moveBackground = () => {
				x += (lFollowX - x) * friction;
				y += (lFollowY - y) * friction;

				const translate = `translate(${x}px, ${y}px) scale(1.1)`;

				img.style.webkitTransform = translate;
				img.style.mozTransform = translate;
				img.style.transform = translate;

				window.requestAnimationFrame(moveBackground);
			};

			const handleMouseMove = (e) => {
				const lMouseX = Math.max(-100, Math.min(100, window.innerWidth / 2 - e.clientX));
				const lMouseY = Math.max(-100, Math.min(100, window.innerHeight / 2 - e.clientY));
				lFollowX = (20 * lMouseX) / 100;
				lFollowY = (10 * lMouseY) / 100;
			};

			window.addEventListener('mousemove', handleMouseMove);
			window.addEventListener('click', handleMouseMove);

			moveBackground();

			return () => {
				window.removeEventListener('mousemove', handleMouseMove);
				window.removeEventListener('click', handleMouseMove);
			};
		};

		animate();
	}, []);

	return (
		<div className="page">
			<div className="content">
				<h1>404</h1>
				<h2>Страница не найдена</h2>
				<p>Кажется, что-то пошло не так..</p>
				<Button
					variant='light'
					onClick={redirectToHome}
					className='btn-outline-secondary'
				>
					На главную
				</Button>
				{/* <button onclick="redirectToHome()">На главную</button> */}
				<img className="image" src="http://www.supah.it/dribbble/008/008.jpg" alt="Background" />
			</div>
		</div>
	);
}

export default PageNotFound;