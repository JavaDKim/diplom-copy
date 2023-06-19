import { useState, useEffect } from "react";
import { Container, Row } from 'react-bootstrap';
//Стили//
import './index.css';
//Функции//
import Api from "./api"
import AppCtx from "./context";

// Код от Димы 06.06.2023 //
import './App.css';
//импортируем хеадер и футер
import NavbarMenu from './components/NavbarHeader';
//импортируем routes
import RoutesBlog from "./routes";
import allCountry from "./country.js"; 


function App() {
	const [user, setUser] = useState(localStorage.getItem("travelBlogUser"));
  const [userId, setUserId] = useState(localStorage.getItem("travelBlogId"));
  const [token, setToken] = useState(localStorage.getItem("travelBlogToken"));
  const [api, setApi] = useState(new Api(token)); // создает класс api из конструктора 
/* 	const [apiCountry, setApiCountry] = useState(new CountryApi()); // создает класс api из конструктора для БД стран*/
	const [country, setCountry] =useState(allCountry); // страны хранит этот массив
	const [elPost, setElPost] = useState({}); // стайт для текущего поста используется в добавлении и редатировании
	const [userInfoObj, setUserInfoObj] =useState(JSON.parse(localStorage.getItem("travelBlogUserInfo"))); // хранит информации о пользователе]
  const [postsSrv, setPostsSrv] = useState([]); // хранит масси всех постов
	const [textSearch, setTextSearch] = useState("") // значение поле для поиска
	const [myPostsSrv, setMyPostsSrv] = useState([]); // хранит массиво только из постов принадлежащи авторизованному пользователю]
	const [postsSrvAll, setPostsSrvAll] = useState(JSON.parse(localStorage.getItem("travelPostsAll"))); // показывать все посты или только с тегом "DiplomLk12"

	useEffect(() => {
    setApi(new Api(token))
  }, [token]) 
// записываем настройки показывать все посты или только с тегом "DiplomLk12"

  // Получение массива со всеми постами//
   useEffect(() => {
    if (api.token) {
      api.getAllPosts()
        .then(data => {
					if (postsSrvAll===true) {
						setPostsSrv(data);						
						localStorage.setItem("travelPostsAll",JSON.stringify(true))
					}
					else{
						setPostsSrv(data?.filter(elx=>elx.tags?.includes("DiplomLk12")));
						localStorage.setItem("travelPostsAll",JSON.stringify(false))
					}
					console.log(data);
				})
			}
			else{
				console.log("нет токена");
			}
  }, [api.token, postsSrvAll]) 
		return (

	<Container className="container_body">
		<AppCtx.Provider value={{
			token,
			setToken,
			api,
			country,
			setUser,
			userId,
			setUserId,
			userInfoObj,
			setUserInfoObj,
			elPost, 
			setElPost,
			postsSrv,
			setPostsSrv,
			postsSrvAll,
			setPostsSrvAll,
			myPostsSrv,
			setMyPostsSrv,
			textSearch, 
			setTextSearch,
		}}>
			<Row className="justify-content-center"><NavbarMenu/></Row>
			<Row><RoutesBlog/></Row>

		</AppCtx.Provider>
	</Container>
  );
}

export default App;
