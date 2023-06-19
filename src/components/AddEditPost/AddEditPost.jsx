import React, { useState, useEffect, useContext } from 'react';
import { Button, Card, Col, Dropdown, Form, Image, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PublicIcon from '@mui/icons-material/Public';
import AppCtx from "../../context"
import VertCard from '../CardPost/VertCard';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import CancelIcon from '@mui/icons-material/Cancel';

const AddEditPost = ({ postObj }) => {
	// если пришел пустой объект то добавление и константе AoE присваиваем true//
	const AorE = Object.keys(postObj).length === 0
	// Стайты для полей
	const [title, setTitle] = useState("")
	const [image, setImage] = useState("")
	const [text, setText] = useState("")
	const [testImg, setTestImg] = useState({}) // проверяет правильность заполнения изображения
	const [textColorImg, setTextColorImg] = useState(false) //окрашивает наш подтекст под вводом изображения
	const [tag, setTag] = useState("");
	const [tags, setTags] = useState(["DiplomLk12"]);
	//Навигация//
	const navigate = useNavigate()
	//Контекст//
	const {
		api,
		user,
		setPostsSrv,
		country,
	} = useContext(AppCtx);
	const [filterCountry, SetFilterCountry] = useState(country);
	//	Обновляем теги //
	const updTag = (val) => {
		// Привести к общему регистру
		const textTag = val.toLocaleLowerCase();
		// получить строку без последнего символа (вдруг там пробел или запятая)
		let cut = textTag.slice(0, text.length - 1);
		// Проверить строку на последний символ
		if (/[\s.,;!?]$/.test(textTag)) {
			// Если пробел или знак препинания - обрубить этот символ и записать в массив с тегами
			// Надо проверять насколько такого тега еще не существует
			setTags(prev => prev.includes(cut) ? prev : [...prev, cut]);
			// очистить инпут
			setTag("");
		} else {
			// идем дальше
			setTag(textTag);
		}
	}

	// удаляем теги
	const delTag = (tag) => {
		if (tag !== "DiplomLk12") {
			setTags(prev => prev.filter(tg => tg !== tag))
		}
	}
	// при нажатии на сохранение
	const savePost = (e) => {
		e.preventDefault()
		let body = {
			title,
			image,
			text,
			tags,
		}

		if (AorE) {
			/* 			console.log("Добавляем"); */
			api.addPost(body)
				.then(data => {
					if (!data.err && !data.error) {
						setPostsSrv(prev => [data, ...prev]);
						clearForm();
						navigate(`/posts`)
					}
				})
		} else {
			/* 			console.log("Редактируем"); */
			api.updSinglePost(postObj?._id, body)
				.then(data => {
					if (!data.err && !data.error) {

						setPostsSrv(prev => prev.map(e => {
							if (e?._id === data?._id) { return data } else return e
						}
						));
					}
					clearForm();
					navigate(`/post/${data?._id}`)
				})
		}
	}
	// выход
	const exit = (e) => {
		e.preventDefault()
		clearForm();
		if (AorE) {
			navigate(`/posts`)
		} else {
			navigate(`/post/${postObj?._id}`)
		}

	}

	const clearForm = () => {
		setTitle("")
		setImage("")
		setText("")
		setTags([])
	}
	//в зависимости от изменния пропса мы исполняем проверку, если это редактирование то заполняем поля из объекта, 
	useEffect(() => {
		if (!AorE) {
			setTitle(postObj.title)
			setImage(postObj.image)
			setText(postObj.text)
			setTags(postObj.tags)
		}
	}, [postObj]);
	let date = new Date();
	const [objPost, setObjPost] = useState({})
	//в зависимости от изменния стэйтов мы заполняем objPost информацией для передачи а карточку VertCard, которая выводится для примера в странице редактировани
	useEffect(() => {
		if (!AorE) {
			setObjPost(
				{
					author: postObj.author,
					title,
					image,
					text,
					tags,
					updated_at: postObj.updated_at,
					likes: postObj.likes,
					comments: postObj.comments
				})
		} else {
			setObjPost(
				{
					author: JSON.parse(localStorage.getItem("travelBlogUserInfo")),
					title,
					image,
					text,
					tags,
					updated_at: String(String(date.getMonth() + 1).padStart(2, '0') + '.' + date.getDate()).padStart(2, '0') + '.' + date.getFullYear(),
					likes: 10,
					comments: 2
				})
		}
	}, [title, image, text, tags]);

	useEffect(() => {
		if (testImg.proportion) {
			setTextColorImg(true)
		}
		else {
			setTextColorImg(false)
		}
	}, [testImg]);

	const changeCountry = (inpEl) => {
		SetFilterCountry(country.filter(e => e.name.includes(inpEl)))
	}

	// вызывается по клику на выпадающем списке стран
	const selectCountry = (selEl) => {
		const emptyInTags = (tags.filter(e => e?.toLowerCase().includes(selEl.name.toLowerCase())).length === 0);
		let emptyInTagsInCountry = true
		tags.forEach(elemTag => country.forEach(elemCountry => {
			if (elemTag?.toLowerCase() === elemCountry.name?.toLowerCase()) {
				emptyInTagsInCountry = false
			}
		}))
		if (emptyInTags && emptyInTagsInCountry) {
			setTags(old => [...old, selEl.name])
		}
		else {
			alert("Cтрана существует в тегах, выбрать можно только одну страну")
		}
	}

	return (
		<>
			{AorE ? "Добавление поста" : "Редактирование поста"}
			<Form className="mt-3 m-0 p-0" onSubmit={savePost}>
				<Row className="d-md-flex mt-3 m-0" style={{ width: "100%" }}>
					<Col sm={12} md={4}>
						<Form.Label >Заголовок поста	</Form.Label>
					</Col>
					<Col sm={12} md={8}>
						<Form.Control type='text' value={title || ""} onChange={(e) => setTitle(e.currentTarget.value)} required={true} placeholder='введите заголовок поста' />
					</Col>
				</Row>
				<Row className="d-md-flex mt-3 m-0" style={{ width: "100%" }}>
					<Col sm={12} md={4}>
						<Form.Label> Текст поста	</Form.Label>
					</Col>
					<Col sm={12} md={8}>
						<Form.Control as='textarea' row={3} value={text || ""} onChange={(e) => setText(e.currentTarget.value)} required={true} placeholder='введите текст' />
					</Col>
				</Row>
				<Row className="d-md-flex mt-3 m-0" style={{ width: "100%" }}>
					<Col sm={12} md={4}>
						<Form.Label> Основное изображение поста	</Form.Label>
					</Col>
					<Col sm={12} md={8}>
						<Form.Control type='url' value={image || ""} onChange={(e) => setImage(e.currentTarget.value)} required={true} placeholder='введите ссылку на изображение' />
						<span style={{ fontSize: "12px", color: textColorImg ? "forestgreen" : "crimson" }}>
							{!testImg.width
								? "Изображение не доступно, проверьте правильность пути"
								: `ширина: ${testImg.width}px высота: ${testImg.height}px, пропорция (ш/в)=${(testImg.width / testImg.height).toFixed(2)}, правильное соотношение сторон (пропорция) между 1.5 и 1.6`}
						</span>

					</Col>
				</Row>
				{/* строка с 2мя столбцами в правом отображение результата а в левом дополнительные поля для заполнения */}
				<Row className="d-md-flex mt-3 m-0">
					<Col xs={12} md={6} className="d-flex mt-3 justify-content-start">
						{/* Работа стегами */}
						<Form.Group className="my-3">
							<Form.Label style={{ fontSize: "14px", marginTop: "10px" }} htmlFor="#country">Добавьте тег, после написания тега нажмите пробел, выберите страну для записывания тега о стране путешествия</Form.Label>
							<Dropdown id='country'>
								<Dropdown.Toggle size="sm" variant="outline-success" id="dropdown-basic">
									<PublicIcon /> Выберите страну
								</Dropdown.Toggle>
								<Dropdown.Menu style={{ overflowY: "scroll", height: "200px" }}>
									<Form.Control type='text' placeholder="Поиск.." onChange={e => { e.preventDefault(); changeCountry(e.currentTarget.value) }} />
									{filterCountry.map((e) => {
										return <Dropdown.Item key={e.id} style={{ fontSize: "12px" }}
											onClick={(el) => selectCountry(e)}>{e.name}</Dropdown.Item>
									})}
								</Dropdown.Menu>
							</Dropdown>

							<Form.Label style={{ fontSize: "14px", marginTop: "10px" }} htmlFor="tags">Введите произвольный тег:</Form.Label>
							<Form.Control
								size='sm'
								type="text"
								id="tags"
								value={tag}
								placeholder='Введите тег и нажмите пробел'
								onChange={(e) => updTag(e.target.value)}
							/>
							{tags.length > 0 && <Form.Text>
								{tags.map(t => <span
									className={`d-inline-block  p-2 mt-2 me-2 rounded-1 `}
									key={t}
									onClick={() => delTag(t)}
									style={{
										cursor: "pointer",
										backgroundColor: t === "DiplomLk12" ? "silver" : "MediumAquamarine"
									}}
								>{t}</span>)}
							</Form.Text>}
						</Form.Group>
					</Col>
					<Col xs={12} md={6} className="d-flex mt-3 justify-content-center justify-content-md-end">
						<Image hidden={true} src={image}
							onError={() => setTestImg({})} // если ошибка и картинка не прогрузилась то устанавливаем в state  пустой объект
							onLoad={(e) => setTestImg( // если прогрузилась картинка то устанавливаем в state объект с ключами ширины, высоты и соответствия пропорции
								{
									"width": e.currentTarget.width,
									"height": e.currentTarget.height,
									//записываем в объект теста картинки true или false в зависимости от правильности пропорции
									"proportion": (e.currentTarget.width / e.currentTarget.height).toFixed(2) >= 1.5 && (e.currentTarget.width / e.currentTarget.height).toFixed(2) <= 1.6
								})} />
						<Card style={{ width: '350px' }}>
							{/* это блок картинку которая скрыта но она является тестом для проверки изображения, т.к. после загрузки возвращает нам размеры */}
							<Card.Body>
								{/* это заглушка поверх карточки чтобы не нажимались внутри кнопки и прочие ссылки */}
								<div style={{ width: "100%", height: "100%", top: "0", left: "0", cursor: "not-allowed", position: "absolute", zIndex: "10" }}></div >
								<VertCard elPost={objPost} />
							</Card.Body>
						</Card>

					</Col>
				</Row>
				<Row className="d-md-flex mt-3 m-0" style={{ width: "100%" }}>
					<Col xs={6} className="d-flex mt-3 justify-content-start">
					</Col>
					<Col xs={6} className="d-flex mt-3 justify-content-end">
						<Button size="sm" variant='outline-danger' style={{ marginRight: "10px" }} onClick={exit}><CancelIcon style={{ marginBottom: "2px", fontSize: "18px" }} /> Отмена</Button>
						<Button type='submit' size="sm" disabled={testImg.proportion ? false : true} variant='outline-success'  ><SaveAsIcon style={{ marginBottom: "2px", fontSize: "18px" }} /> Сохранить</Button>
					</Col>
				</Row>
			</Form >

		</>
	);
}

export default AddEditPost;
