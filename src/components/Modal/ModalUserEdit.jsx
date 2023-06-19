import { useContext, useState } from 'react';
import "./style.css"
import { Button, ButtonGroup, Form, Image } from 'react-bootstrap';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import CancelIcon from '@mui/icons-material/Cancel';
import AppCtx from "../../context"

const ModalUserEdit = ({ setEdit, name, setName, about, setAbout, avatar, setAvatar }) => {
	const [newName, setNewName] = useState(name)
	const [newAbout, setNewAbout] = useState(about)
	const [newAvatar, setNewAvatar] = useState(avatar)

	function isValidUrl(url) {
		const objRE = /(^https?:\/\/)?[^?#]+\.(png|jpe?g)([?#].*)?$/g;
		return objRE.test(url);
	}

	const {
		api,
	} = useContext(AppCtx);

	const saveUser = (e) => {
		e.preventDefault()
		if (isValidUrl(newAvatar) && newName.trim() !== "" && newAbout.trim() !== "") {
			let body = {
				name: newName,
				about: newAbout,
				avatar: newAvatar
			}
			if (newName !== name || newAbout !== about) {
				delete body.avatar
				api.updProfile(body).then(data => {
					if (!data.err) {
						setName(newName)
						setAbout(newAbout)
						setEdit(false)
					} else {
						console.log(data.message);
					}
				})
			}
			if (newAvatar !== avatar) {
				delete body.name
				delete body.about
				api.updProfile(body, true).then(data => {
					if (!data.err) {
						setAvatar(newAvatar)
						setEdit(false)
					} else {
						console.log(data.message);
					}
				})
			}
		}
		else
			alert("неправильный адрес ссылки на изображение аватара, только с расширением jpg,png, поле имя и обо мне не должно быть пустым или заполненным пробелами ")
	}
	const canselEdit = (e) => {
		e.preventDefault()
		setEdit(false)
	}
	return (
		<div className='outline'>
			<div className='inline'>
				<div className='closeEdit' onClick={canselEdit}><CancelIcon /></div>
				<Image className='avatar' src={newAvatar} /> {/* NewAvatar("https://i.ibb.co/YXS6Vwj/Avatar-PNG-Image-1.png") */}
				<Form className='formEdit' onSubmit={saveUser}>
					<Form.Label className='lableEdit' htmlFor='img'> введите ссылку на изображение аватара</Form.Label>
					<Form.Control id='img' type='text' value={newAvatar} required onChange={(e) => setNewAvatar(e.currentTarget.value)} />

					<Form.Label className='lableEdit' htmlFor='name'> введите имя, фамилию или псевдоним</Form.Label>
					<Form.Control id='name' type='text' value={newName} required onChange={(e) => setNewName(e.currentTarget.value)} />

					<Form.Label className='lableEdit' htmlFor='about'> введите краткую информацию о себе</Form.Label>
					<Form.Control id='about' type='text' value={newAbout} required onChange={(e) => setNewAbout(e.currentTarget.value)} />
					<ButtonGroup className='btnGroupEdit'>
						<Button className='btnEdit' size='sm' variant='danger' type='button' onClick={canselEdit}><CancelIcon style={{ fontSize: "18px", marginBottom: "2px" }} /> Отменить</Button>
						<Button className='btnEdit' size='sm' variant='success' type='submit'><SaveAsIcon style={{ fontSize: "18px", marginBottom: "2px" }} /> Cохранить</Button>
					</ButtonGroup>
				</Form>
			</div>
		</div>
	);
}

export default ModalUserEdit;
