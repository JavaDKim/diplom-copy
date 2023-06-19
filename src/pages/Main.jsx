import { Row, Col, Form, Container } from 'react-bootstrap';
import { useContext, useEffect } from "react";
import AppCtx from "../context";

import PostPopular from '../components/PostPopular';
import PostNew from '../components/PostNew';
import NavbarFilter from '../components/NavbarFilter';
import Header from '../components/Header';
import NavbarFooter from '../components/NavbarFooter'
import { popularArray } from '../assets/mainPosts';
import { newArray } from '../assets/mainPosts';


function Main() {


	useEffect(() => {
		document.title = 'Главная страница';
	}, []);

	return <>
		<Row>
			<Row className='d-flex justify-content-center m-0 p-0' ><Header /></Row>
			<Row className='d-flex justify-content-center m-0 p-0 mt-2'><NavbarFilter /></Row>
			<Form className='d-flex justify-content-center'>
				<h3 className='mt-2'>Популярное</h3>
			</Form>
			<Row className='justify-content-beetwen m-0 p-0 mt-2'/* style={{ display: "grid", gridTemplateColumns: `1fr 1fr`, columnGap: "10px" }} */>
				{popularArray.map(e => { return <PostPopular key={e.id} {...e} /> })}
			</Row>
		</Row>
		<Form className='d-flex justify-content-center'>
			<h3 className='mt-3'>Новые публикации</h3>
		</Form>
		<Row className='justify-content-beetwen m-0 p-0'>
			{newArray.map(e => { return <PostNew key={e.id} {...e} /> })}
		</Row>
		<Row className='justify-content-center m-0 p-0 mt-3'>
			<NavbarFooter />
		</Row>


	</>
}

export default Main;