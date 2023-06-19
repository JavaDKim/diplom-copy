import React, { useState } from 'react';
import { Button, Card, Col } from 'react-bootstrap';
import "./style.css"
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import CommentIcon from '@mui/icons-material/Comment';
import AppCtx from "../../context"
import ShareIcon from '@mui/icons-material/Share';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

import Likes from '../Likes/likes';

const VertCard = ({ elPost }) => {
	const navigate = useNavigate()
	const {
		setToken,
		api,
		userId,
		setUser,
		setUserId
	} = useContext(AppCtx);
	const goUserProfile = (e) => {
		e.preventDefault()
		navigate(`/profile/${elPost.author._id}`)
	}
	const goUserPost = (e) => {
		e.preventDefault()
		navigate(`/post/${elPost._id}`)
	}

	return (
		<>
			<Card >
				<Card.Header style={{ fontSize: "12px" }} className='d-flex justify-content-between'>
					<span style={{ marginTop: "2px", width: "auto", color: "grey", cursor: "pointer" }} onClick={goUserProfile}><img width={20} height={20} style={{ borderRadius: "50%", marginBottom: "2px", marginRight: "2px" }} src={elPost.author?.avatar} alt='аватар' />{elPost.author?.name}</span>
					<span style={{ marginTop: "3px", width: "auto", color: "grey" }}><EventAvailableIcon style={{ fontSize: "18px", marginBottom: "3px", color: "RoyalBlue" }} /> {elPost.updated_at?.slice(0, 10)}</span>
				</Card.Header>

				<Card.Body style={{ padding: "0.5px" }}>
					<Card.Text>
						<Card.Img variant="top" className='mt-3' style={{ borderRadius: "0", cursor: "pointer" }} src={elPost.image} alt='изображение' onClick={goUserPost} />
					</Card.Text>
					<Card.Title style={{ fontSize: "14px", fontWeight: "550", padding: "0px 19px 0px 19px" }}>{elPost?.title}</Card.Title>
					<Card.Text style={{ fontSize: "12px", padding: "5px 19px 5px 19px" }}>
						{elPost.text?.slice(0, 130)}
						<Card.Link style={{ textDecoration: "none", color: "DodgerBlue" }} href={`/post/${elPost?._id}`}><ReadMoreIcon /> далее</Card.Link>
					</Card.Text>
				</Card.Body>
				<Card.Footer className='d-flex justify-content-between'>
					<div>
						<Likes elPost={elPost} userId={userId} />
						<span style={{ fontSize: "14px", fontWeight: "550", width: "auto", color: "grey", marginLeft: "15px" }} onClick={goUserPost}>
							<CommentIcon style={{ fontSize: "24px", marginBottom: "3px", color: "Teal", cursor: "pointer" }} /> {elPost.comments?.length}
						</span>
					</div>
					<span><ShareIcon style={{ color: "grey" }} /></span>
				</Card.Footer>
			</Card >
		</>
	);
}

export default VertCard;
