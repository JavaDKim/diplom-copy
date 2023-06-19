import React, { useContext, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import AppCtx from "../context"
import VertCard from '../components/CardPost/VertCard';

const Search = () => {

	useEffect(() => {
		document.title = "Поиск по сайту TravelBlog";
	}, []);

	const {
		postsSrv,
		setPostsSrv,
		textSearch,
	} = useContext(AppCtx);

	const [uniqueArr, setUniqueArr] = useState([])

	useEffect(() => {
		let filterPosts = []
		postsSrv?.forEach(element => {
			if (element.text.toLowerCase().includes(textSearch.toLowerCase())) {
				filterPosts = [...filterPosts, element]
			}
			element.tags.forEach(tag => {
				if (tag.toLowerCase() === textSearch.toLowerCase()) {
					filterPosts = [...filterPosts, element]
				}
			});
		})
		const arr = Array.from(new Set(filterPosts));
		setUniqueArr(arr)
	}, [textSearch]);


	return (
		<Container className="contain_Page_Posts">
			{uniqueArr?.length > 0 && <>
				{uniqueArr?.map((e, i) => <VertCard key={e._id} elPost={e} />)}
			</>}
			{uniqueArr?.length === 0 && <>
				<h5>Ничего не найдено</h5>
			</>}
			{/* {postsSrv?.filter(el => el.text.toLowerCase().includes(textSearch.toLowerCase())).map((e, i) => <VertCard key={e._id} elPost={e} />)}
			{postsSrv?.filter(el => el.text.toLowerCase().includes(textSearch.toLowerCase())).length === 0 ?
				<h5>Ничего не найдено</h5>
				: <></>} */}
		</Container>
	)
}

export default Search;
