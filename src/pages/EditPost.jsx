import { Container } from "react-bootstrap";
import AddEditPost from "../components/AddEditPost/AddEditPost";
import { useContext, 	useEffect } from "react";
import AppCtx from "../context"

function EditPost() {

	useEffect(() => {
		document.title = 'Редактирование поста';
	  }, []);


	const {
		elPost,
	} = useContext(AppCtx);

	return <Container>
		<AddEditPost postObj={elPost} />
	</Container>
}

export default EditPost;