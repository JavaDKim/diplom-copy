import { useState, useEffect, useContext } from "react";
import AppCtx from "../context"
import { Button, Card, Container, Form } from "react-bootstrap";
import "./style.css"
import { useNavigate } from "react-router-dom";
import { XCircle } from "react-bootstrap-icons";


function Auth() {
	const {
		setToken,
		api,
		user,
		setUser,
		setUserId,
		setPostsSrvAll,
		setUserInfoObj
	} = useContext(AppCtx);
	//навигация по путям 
	const navigate = useNavigate()
	//state для понимания и отрисовки регистрации или входа//
	const [regOrSign, setRegOrSign] = useState(false);
	//Переменные для регистрации или авторизации//
	const [email, setEmail] = useState("");
	const [pwd, setPwd] = useState("");
	const [testPwd, setTestPwd] = useState("");
	const [regName, setRegName] = useState("");

	//Функция для очистки формы//
	const clearForm = () => {
		setRegName("");
		setEmail("");
		setPwd("");
		setTestPwd("")
	}
	//это функция выхода или отмены
	const regOrSignExit = () => {
		navigate("/")
		setUserInfoObj({})
		clearForm()
	}
	// Изменяем state чтобы отобразить блок с регистрацией или входом
	//если false то вход, инаяе регистрация
	const regOrSignState = () => {
		if (regOrSign) {
			setRegOrSign(false)
			clearForm()
		}
		else {
			setRegOrSign(true)
			clearForm()
		}
	}

	useEffect(() => {
		document.title = 'Авторизация TravelBlog';
	  }, []);

	// возвращаем стиль color: если пароли совпадают и кримсон если нет
	const testAccess = {
		color: pwd === testPwd ? "forestgreen" : "crimson"
	}

	useEffect(() => {
		if (user) {
			setToken(localStorage.getItem("travelBlogToken"));
			setUserId(localStorage.getItem("travelBlogId"));

		}
		else {
			setToken("");
			setUserId("");
		}
	}, [user])

	// Входим или регистируемся//
	const regOrSignSubmit = async (e) => {
		e.preventDefault();
		// наполняем body будующего fetch
		let body = {
			email: email,
			password: pwd
		}
		if (regOrSign) {
			//регистируемся//
			//console.log("регистируемся")//
			// наполняем body будующего fetch
			body.name = regName;
			body.group = "group-12";
			// отправляем fetch на регистрацию
			let fetchReg = await api.reg(body)
			// если нет ошибок удаляем из body name и group для будующего fetch запроса на авторизацию
			if (!fetchReg.err) {
				delete body.name;
				delete body.group;
			} else {
				// иначе выводим ошибку и сообщение с ответом ошибки от сервера
				return alert(`Ошибка регистрации ${fetchReg.message}`)
			}
		}
		//входим//
		//console.log("входим")//
		const fetchAuth = await api.auth(body)
		if (!fetchAuth.err) {
			//console.log(fetchAuth);//
			localStorage.setItem("travelBlogUser", fetchAuth.data.name)
			localStorage.setItem("travelBlogToken", fetchAuth.token);
			localStorage.setItem("travelBlogId", fetchAuth.data._id);
			localStorage.setItem("travelBlogUserInfo", JSON.stringify(fetchAuth.data))
			localStorage.setItem("travelPostsAll", JSON.stringify(true))
			setPostsSrvAll(true)
			setToken(fetchAuth.token);
			setUser(fetchAuth.data.name)
			setUserId(fetchAuth.data._id)
			setUserInfoObj(fetchAuth.data)
			clearForm();
			navigate("/posts")
		} else {
			return alert(`Ошибка авторизации ${fetchAuth.message}`)
		}
	}

	return (<>

		<Container className="authSign_container">
			<Card className="authSign_Card">
				<Card.Header className="d-flex justify-content-between" as="h5">
					{regOrSign ? "Регистрация" : "Войдите в профиль"}
					<XCircle title="закрыть" style={{ color: "crimson", cursor: "pointer" }} onClick={regOrSignExit} />
				</Card.Header>
				<Card.Body>
					<Form onSubmit={regOrSignSubmit}>
						{regOrSign &&
							<Form.Control placeholder="Введите имя" className="mt-" as="input" type="text" required={true} value={regName} onChange={(e) => setRegName(e.currentTarget.value)} />
						}
						<Form.Control placeholder="Введите email" className="mt-3" as="input" type="email" required={true} value={email} onChange={(e) => setEmail(e.currentTarget.value)} />
						<Form.Control placeholder="Введите пароль" className="mt-3" as="input" type="password" required={true} value={pwd} onChange={(e) => setPwd(e.currentTarget.value)} />
						{regOrSign &&
							<Form.Control placeholder="Повторите пароль" className="mt-3" as="input" type="password" required={true} value={testPwd} onChange={(e) => setTestPwd(e.currentTarget.value)}
								style={testAccess} />
						}
						<Card.Text className="d-flex justify-content-between mt-3">
							<Button size="sm" type="button" variant="outline-danger" onClick={regOrSignExit}>Отмена</Button>
							<Button size="sm" type="button" variant="outline-info" onClick={regOrSignState}>{regOrSign ? "Войдите" : "зарегистрироваться "}</Button>
							<Button size="sm" type="submit" variant="outline-success"
								disabled={regOrSign && (!pwd || pwd !== testPwd || regName.trim() === "")}
							>{regOrSign ? "Зарегистрироваться" : "Войти"}</Button>
						</Card.Text>
					</Form>
				</Card.Body>
				<Card.Footer className="d-flex justify-content-center">
				</Card.Footer>
			</Card>
		</Container >
	</>)

}

export default Auth;