import { useContext, useEffect, useState } from "react";
import AppCtx from "../context";
import { Button, Container, Row } from "react-bootstrap";
import "./style.css"
import VertCard from "../components/CardPost/VertCard";
import Pagination from "../components/Pagination";
import usePagination from "../hooks/usePagination";

function Posts() {

	const {
		postsSrv,
		setPostsSrv,
		token,
		setToken,
		api,
		setApi,
		user,
		setUserId,

	} = useContext(AppCtx);
	const [sort, setSort] = useState(true)

	let paginate = usePagination(postsSrv, 20)
	/* 	useEffect(() => {
			paginate.step(1);
		}, [paginate]); */

	useEffect(() => {
		document.title = 'Посты TravelBlog';
	}, []);

	return (
		<Container>
			<Row className="mb-2"><Pagination hk={paginate} setSort={setSort} /></Row>
			<Row className="contain_Page_Posts">
				{paginate.setDataPerPage(sort).map((e) => <VertCard key={e._id} elPost={e} />)}
				{/* {postsSrv.map((e) => <VertCard key={e._id} elPost={e} />)} */}
			</Row>
		</Container>
	)
}

export default Posts;