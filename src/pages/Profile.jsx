import { useEffect, useContext, useState } from "react";
import { Container, Row, Col, Image, Form, Button, Badge } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

//Стили//
import './style.css';

//Контексты//
import AppCtx from "../context"
import HorizCard from "../components/CardPost/HorizCard";
import ModalUserEdit from "../components/Modal/ModalUserEdit";


function Profile() {
	const { id } = useParams();
	const navigate = useNavigate()

	const {
		token,
		api,
		userId,
		myPostsSrv,
		setMyPostsSrv,
		postsSrv
	} = useContext(AppCtx);

	useEffect(() => {
		api.getProfileId(id)
			.then(data => {
				if (!data.err) {
					setName(data.name)
					setAbout(data.about)
					setAvatar(data.avatar)
					setMyPostsSrv(postsSrv?.filter(el => el.author._id.includes(id)))
				}
			})
	}, [postsSrv, id, api, setMyPostsSrv]);

	const [name, setName] = useState("")
	const [about, setAbout] = useState("")
	const [avatar, setAvatar] = useState("")
	const [edit, setEdit] = useState(false)

	useEffect(() => {
		if (avatar === "https://react-learning.ru/image-compressed/default-image.jpg") {
			setAvatar("https://i.ibb.co/YXS6Vwj/Avatar-PNG-Image-1.png")
		}
	}, [avatar]);

	useEffect(() => {
		document.title = "Профиль " + name;
	}, [name]);

	return <>
		<Container>
			<Row>
				{edit && <ModalUserEdit setEdit={setEdit} name={name} setName={setName} about={about} setAbout={setAbout} avatar={avatar} setAvatar={setAvatar} />}  {/* вызовем модальное окно для редактирования */}
				<Col xs={12} md={6} className="d-flex justify-content-center justify-content-md-start">
					<Image src={avatar} roundedCircle thumbnail style={{ width: "300px", height: "300px", border: "1px solid grey" }} />
				</Col>
				<Col xs={12} md={6} className="d-flex justify-content-center justify-content-md-end">
					<Form className="align-self-center mt-3 mt-md-0">
						<Form.Control className="text-center text-md-start pb-0" style={{ fontSize: "30px", fontWeight: "700" }} plaintext={true} readOnly={true} type="text" value={name || ""} />
						{id === userId &&
							<Form.Group className="d-flex justify-content-center justify-content-md-start mt-0">
								<Badge size="sm" className="m-0" bg="secondary" style={{ cursor: "pointer" }} onClick={(e) => { e.preventDefault(); setEdit(true) }}><EditIcon style={{ fontSize: "12px" }} /> Редактировать</Badge>
							</Form.Group>}
						<Form.Control className="text-center text-md-start" style={{ fontSize: "20px", fontWeight: "400" }} plaintext={true} readOnly={true} type="text" value={about || ""} />
						{id === userId &&
							<Form.Group className="d-flex justify-content-center justify-content-md-start mt-2">
								<Button variant="outline-danger" size="sm" onClick={(e) => { e.preventDefault(); navigate("/post/add") }} ><AddIcon style={{ fontSize: "14px" }} /> Добавить пост</Button>
							</Form.Group>
						}
					</Form>
				</Col>
			</Row>
			{!edit &&
				<Row>
					<Row xs={12} className="mt-md-5 mt-3 text-center text-md-start">
						<h4 style={{ fontWeight: "550" }}>Мои публикации</h4></Row>
					{myPostsSrv.map(e => <HorizCard key={e._id} elPost={e} />)}
				</Row>}
		</Container>
	</>

}

export default Profile;