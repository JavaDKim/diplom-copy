import React from 'react';
import { Accordion, Col, Container, Image, Row } from 'react-bootstrap';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import { useNavigate } from 'react-router-dom';


const HorizCard = ({ elPost }) => {
	const navigate = useNavigate()
	const goToPost = (e) => {
		e.preventDefault()
		navigate(`/post/${elPost._id}`)
	}
	return (
		<Container className='mt-3 p-4' style={{ minWidth: "330px", border: "1px solid grey", borderRadius: "10px" }}>
			<Row >
				<Col xs={12} lg={6} className='d-flex justify-content-center justify-content-lg-start '>
					<Image height={240} rounded src={elPost.image} onClick={goToPost} style={{ cursor: "pointer" }} />
				</Col>
				<Col xs={12} lg={6} className='justify-content-center justify-content-lg-start mt-2 mt-lg-0'>
					<Row className="mb-1 justify-content-end" >
						<span style={{ fontSize: "12px", fontWeight: "550", width: "auto", color: "DarkGray" }}><CommentIcon style={{ fontSize: "18px", marginBottom: "3px", color: "Teal" }} /> {elPost.comments.length}</span>
						<span style={{ fontSize: "12px", fontWeight: "550", width: "auto", color: "DarkGray" }}><FavoriteIcon style={{ fontSize: "18px", marginBottom: "3px", color: "crimson" }} /> {elPost.likes.length}</span>
						<span style={{ fontSize: "12px", fontWeight: "550", width: "auto", color: "DarkGray" }}><EventAvailableIcon style={{ fontSize: "18px", marginBottom: "3px", color: "RoyalBlue" }} /> {elPost.updated_at.slice(0, 10)}</span>
					</Row>
					<Accordion >
						<Accordion.Item eventKey={elPost._id}>
							<Accordion.Header>{elPost.title}</Accordion.Header>
							<Accordion.Body>
								{elPost.text}
							</Accordion.Body>
						</Accordion.Item>
					</Accordion>
				</Col>
			</Row>
		</Container>
	);
}

export default HorizCard;
