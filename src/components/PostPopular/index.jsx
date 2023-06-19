import { Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';


function PostPopular({ img, title, text, data, id }) {
	const navigate = useNavigate()

	const go = (e) => {
		e.preventDefault()
		navigate(`/post/${id}`)
	}
	return (
		<Col xs={12} md={6} className='justify-content-center mt-2'>
			<Card className="bg-dark text-white" style={{ padding: "0", border: "0px", position: "relative", cursor: "pointer" }}>
				<Card.Img onClick={go} src={require(`../../assets/images/${img}`)} alt={title} />
				<Card.ImgOverlay onClick={go}>
					<Card.Title>{title}</Card.Title>
					<Card.Text style={{ fontSize: "14px" }}>{text.slice(0, 200) + "....."}</Card.Text>
					<Card.Text style={{ position: "absolute", right: "0", bottom: "0", padding: "10px", fontSize: "14px" }}>{data}</Card.Text>
				</Card.ImgOverlay>
			</Card>
		</Col>
	);
}

export default PostPopular;