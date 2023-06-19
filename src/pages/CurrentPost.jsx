import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import HomeIcon from '@mui/icons-material/Home';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
//Стили//
import './style.css';

//Контексты//
import AppCtx from "../context"
import Auth from "./Auth"

import NavbarFooter from '../components/NavbarFooter'
import { Button, Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import Reviews from "../components/Reviews/Reviews";
import MapApi from "../components/MapApi"




function CurrentPost() {
	const navigate = useNavigate()
	const { postId } = useParams();
	const [titleCountry, setTitleCountry] = useState("");
	const {
		token,
		api,
		country,
		userId,
		elPost,
		setElPost,
		setPostsSrv
	} = useContext(AppCtx);


	const [elPostComments, setElPostComments] = useState([]);
	const [elPostLikes, setElPostLikes] = useState([]);
	const [elPostTags, setElPostTags] = useState([]);
	const [xСoordinate, SetXСoordinate] = useState(0);
	const [yСoordinate, SetYСoordinate] = useState(0);


	const [descriptionCountry, setDescriptionCountry] = useState("");


	useEffect(() => {
		api.getSinglePost(postId)
			.then(data => {
				if (!data.err) {
					setElPost(data); //стэйтим элемент поста, который прокинут из App
					setElPostComments(data.comments)
					setElPostLikes(data.likes)
					setElPostTags(data.tags)
				}
				// Проверяем есть ли в тегах Страна или нет (сравнивая теги в массиве со странами)
				setTitleCountry("")
				setDescriptionCountry("")
				data.tags?.map(e => country?.map(x => {
					if (x.name?.toLowerCase() === e?.toLowerCase()) {
						setTitleCountry(x.name);
						setDescriptionCountry(x.description)
						SetXСoordinate(old => x.north);
						SetYСoordinate(old => x.east);
					}
				}))
				/* data.text? */

			})
	}, [token]);

	useEffect(() => {

	}, [titleCountry]);
	//удаление поста//
	const delPost = (e) => {
		e.preventDefault()
		api.delSinglePost(postId)
		setPostsSrv(prev => prev.filter(e => e?._id !== postId))
		navigate("/posts")

	}

	useEffect(() => {
		if (elPost?.title) {
			(document.title = elPost.title)
		}
		else {
			(document.title = "TravelBlog")
		}
	}, [elPost]);


	return <>{userId && <Container>


		<Row className="justify-content-beetwen m-0 p-0 mt-3" >
			<Col xs={12} md={3} className="d-flex flex-column align-items-beetwen mt-2">
				<Row >
					<h2>{titleCountry?.length !== 0 ? titleCountry : "Где то неподалеку ..."}</h2>
					<p style={{ fontSize: "14px" }}>{descriptionCountry?.length !== 0 ? descriptionCountry : "в мире столько интересных мест"}</p>
				</Row>
			</Col>

			{/* блок ОТЗЫВОВ */}
			<Col xs={12} md={9} className="justify-content-center my-3 text-end">

				<Tabs
					defaultActiveKey="home"
					id="uncontrolled-tab-example"
					className="mb-3"
				>
					<Tab eventKey="home" title="Фото">
						<img
							src={elPost?.image}
							alt="фото поста "
							className="w-100"
							style={{ borderRadius: "5px", width: "300px" }}
						/>
					</Tab>
					<Tab eventKey="profile" title="Геолокация">
						<Row style={{ marginLeft: "0", padding: "0" }}>
							{titleCountry?.length !== 0 &&
								<MapApi titleCountry={titleCountry} xСoordinate={xСoordinate} yСoordinate={yСoordinate} />}
						</Row>
					</Tab>
				</Tabs>
			</Col>
		</Row >
		<Row className=" mt-2">

			<Col xs={12}>
				<div>
					<h4 className="mt-3" style={{}}>
						{elPost?.title}
					</h4>
					{userId === elPost.author?._id && <>
						<Button size="sm" variant="outline-secondary" onClick={(e) => { e.preventDefault(); navigate("/post/edit") }}><EditIcon style={{ fontSize: "16px" }} /> Редактировать</Button>
						<Button style={{ marginLeft: "10px" }} size="sm" variant="outline-danger" onClick={delPost}><DeleteForeverIcon style={{ fontSize: "16px" }} />Удалить пост</Button>

					</>
					}
				</div>
			</Col>

			<Col xs={12}>
				<div className="mt-5">
					<p>{elPost?.text}
					</p>
				</div>
			</Col>
		</Row >

		<Row className="justify-content-beetwen m-0 p-0 mt-3">
			<Col
				xs={6}
				md={6}
				className="justify-content-center mt-3 p-0 text-start"
			>
				<p>{elPost.author?.name}</p>
			</Col>
			<Col xs={6} md={6} className="justify-content-center mt-3 p-0 text-end">
				<span> {elPost.updated_at?.slice(0, 10)}</span>
			</Col>

		</Row>

		<Row className="justify-content-center">
			<Col xs={12} className="d-flex justify-content-start">
				{elPost.tags?.length > 0 &&
					elPost.tags?.map(t => <span
						className={`me-2 rounded-1 `}
						key={t}
						onClick={() => { }}
						style={{
							cursor: "pointer",
							backgroundColor: t === "DiplomLk12" ? "silver" : "MediumAquamarine",
							padding: "0 8px 0 8px"
						}}
					>{t}</span>)}
			</Col>
		</Row>
		<Row className="justify-content-center justify-content-md-start mt-2">
			<Reviews />
		</Row>
		<Row className="justify-content-center mt-5 mb-5">
			<Col xs={12} className="d-flex justify-content-center">
				<Button variant="outline-secondary" onClick={() => navigate("/posts")}>
					<HomeIcon style={{ fontSize: "20", marginBottom: "5px" }} /> На главную
				</Button>
			</Col>
		</Row>
		<Row className="justify-content-center m-0 p-0 mt-3">
			<NavbarFooter />
		</Row>
	</Container >}

		{!userId && <Container>
			<Row xs={12} md={6}>
				<Auth />
			</Row>
		</Container>
		}
	</>
}

export default CurrentPost;

