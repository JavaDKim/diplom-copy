import { useEffect, useState, useContext } from "react";
import AppCtx from "../context"
import VertCard from "../components/CardPost/VertCard";
import { Container } from "react-bootstrap";


const Favorites = () => {

	useEffect(() => {
		document.title = 'Избранные посты TravelBlog';
	  }, []);

	const { userId, postsSrv } = useContext(AppCtx)
	return (
		<Container className="contain_Page_Posts">
			{postsSrv?.filter(el => el.likes.includes(userId)).map(e => <VertCard key={e._id} elPost={e} />)}
		</Container>
	)
}

export default Favorites;