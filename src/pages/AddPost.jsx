import { Container, Row } from "react-bootstrap";
import AddEditPost from "../components/AddEditPost/AddEditPost";
import { useEffect } from "react";



function AddPost() {
	useEffect(() => {
		document.title = 'Добавление поста';
	  }, []);
	return <Container>
		<AddEditPost postObj={{}} />
	</Container>
}

export default AddPost;