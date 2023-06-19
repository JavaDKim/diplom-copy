import React, { useEffect, useState, useContext } from 'react';
import { Accordion, Button, Card, Col, Form, Image, Row } from 'react-bootstrap';
import AppCtx from "../../context"
import QueryBuilderRoundedIcon from '@mui/icons-material/QueryBuilderRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditIcon from '@mui/icons-material/Edit';
import SaveAsIcon from '@mui/icons-material/SaveAs';


const Reviews = () => {
	let date = new Date();

	const {
		api,
		userInfoObj,
		elPost,
		setElPost,
		setPostsSrv
	} = useContext(AppCtx);
	const [textReview, SetTextReview] = useState([])

	//	удаление отзыва
	const deleteComment = (e) => {
		api.delReview(elPost._id, e._id)
			.then(data => {
				setElPost(data)
				setPostsSrv(old => old.map(
					x => { return x._id === elPost._id ? data : x }
				))

			})
	}
	//	сохранение отзыва
	const saveComment = (e) => {
		e.preventDefault()
		if (textReview.trim() !== 0) {
			api.addReview(elPost._id, { "text": textReview })
				.then(data => {
					setElPost(data)
					SetTextReview("")
					setPostsSrv(old => old.map(
						x => { return x._id === elPost._id ? data : x }
					))
				})

		}
	}


	return (
		<Row className='mt-3'>
			<Accordion style={{ fontSize: "12px" }}>
				<Accordion.Item eventKey="0">
					<Accordion.Header>Комментарии {elPost.comments?.length}</Accordion.Header>
					<Accordion.Body >
						{/* //Добавление отзыва// */}
						<Card className="text-left mt-2">
							<Card.Header className='d-flex justify-content-between'>
								<div style={{ display: "flex", alignItems: "end" }}>
									<h5>Добавить комментарий</h5>
								</div>
								<div>
									<Image width={40} height={40} style={{ borderRadius: "50%", border: "1px solid gray", padding: "0", margin: "0" }} src={userInfoObj?.avatar} />
									<span style={{ marginLeft: "5px" }}>{userInfoObj?.name}</span>
								</div>
							</Card.Header>
							<Card.Body>
								<Form onSubmit={saveComment}>
									<Form.Group>
										<Form.Control as='textarea' rows={4} required placeholder='Напишите тут ...' value={textReview} onChange={(e) => { SetTextReview(e.currentTarget.value) }} />
									</Form.Group>
									<Form.Group className='d-flex justify-content-end'>
										<Button className='mt-3' size="sm" type='onSubmit' variant='outline-success'><SaveAsIcon /> Сохранить</Button>
									</Form.Group>
								</Form>
							</Card.Body>
							<Card.Footer className="text-muted"><QueryBuilderRoundedIcon style={{ fontSize: "16px", marginBottom: "3px", color: "Green" }} /> {String(String(date.getMonth() + 1).padStart(2, '0') + '.' + date.getDate()).padStart(2, '0') + '.' + date.getFullYear()}</Card.Footer>
						</Card>
						{/* //Вывод все отзывов// */}
						{elPost.comments?.map(e =>
							<Card key={e._id} className="text-left mt-2">
								<Card.Header className='d-flex justify-content-between'>
									<div>
										<Image width={40} height={40} style={{ borderRadius: "50%", border: "1px solid gray", padding: "0", margin: "0" }} src={e.author.avatar} />
										<span style={{ marginLeft: "5px" }}>{e.author.name}</span>
									</div>
									{userInfoObj._id === e.author._id &&
										<div onClick={(el) => deleteComment(e)}>
											<DeleteRoundedIcon style={{ marginTop: "5px", color: "Maroon" }} />
										</div>
									}
								</Card.Header>
								<Card.Body>
									<Card.Text>
										{e.text}
									</Card.Text>
								</Card.Body>
								<Card.Footer className="text-muted"><QueryBuilderRoundedIcon style={{ fontSize: "16px", marginBottom: "3px", color: "Green" }} /> {e.updated_at.slice(0, 10)}</Card.Footer>
							</Card>
						)}
					</Accordion.Body>

				</Accordion.Item>
			</Accordion >
		</Row >
	);
}

export default Reviews;
