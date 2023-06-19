import { useContext, useEffect, useState } from "react";
import { Button, Container, Form, Nav, Navbar, NavDropdown, Offcanvas, Row } from 'react-bootstrap';
import AppCtx from "../../context"
import "./navbar.css"
import { useNavigate } from "react-router-dom";
// икноки из библиотеки mui //
import PostAddIcon from '@mui/icons-material/PostAdd';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import GroupIcon from '@mui/icons-material/Group';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";

function NavbarMenu() {
	const {
		setUser,
		userId,
		setUserId,
		setToken,
		postsSrv,
		setPostsSrv,
		textSearch,
		setTextSearch
	} = useContext(AppCtx);
	const navigate = useNavigate()
	const exit = (e) => {
		e.preventDefault()
		setUser("")
		setUserId("")
		setToken("")
		localStorage.removeItem("travelPostsAll");
		localStorage.removeItem("travelBlogUser");
		localStorage.removeItem("travelBlogToken");
		localStorage.removeItem("travelBlogId");
		localStorage.removeItem("travelBlogUserInfo");
		navigate("/")
	}

	const postsFavor = (e) => {
		e.preventDefault()
		navigate("/favorites")
	}


	const search = (e) => {
		e.preventDefault()
		navigate("/search")
	}

	return (
		<Row className='navbar'>
			{['lg'].map((expand) => (
				<Navbar key={expand} bg="opacity-100" expand={expand} className="mb-3">
					<Container fluid>
						<Navbar.Brand className="link_header" onClick={e => { e.preventDefault(); navigate("/") }}><img width={200} src={require('../../assets/images/logo.png')} /></Navbar.Brand>
						<Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
						<Navbar.Offcanvas

							id={`offcanvasNavbar-expand-${expand}`}
							aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
							placement="end"
						>
							<Offcanvas.Header closeButton >
								<Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
									Меню сайта
								</Offcanvas.Title>
							</Offcanvas.Header>
							<Offcanvas.Body>
								{!userId &&
									<Nav className="justify-content-end flex-grow-1 pe-3">
										<Nav.Link className="link_header" title="авторизация" onClick={e => { e.preventDefault(); navigate("/auth") }}>	<span>Вход</span></Nav.Link>
									</Nav>}
								{userId && <>
									<Nav className="justify-content-end flex-grow-1 pe-3">
										<Nav.Link className="link_header" title="добавить пост" onClick={e => { e.preventDefault(); navigate("/post/add") }}>	<PostAddIcon style={{ color: "Grey" }} /> Добавить</Nav.Link>
										<Nav.Link className="link_header" title="посты пользователей" onClick={e => { e.preventDefault(); navigate("/posts") }}>	<DynamicFeedIcon style={{ color: "Grey" }} /> Посты</Nav.Link>
										{/* <Nav.Link className="link_header" href="/" title="пользователи">	<GroupIcon style={{ color: "Grey" }} /> Блогеры</Nav.Link> */}
										<Nav.Link className="link_header" title="избранное" onClick={postsFavor}>	<FavoriteIcon style={{ color: "Grey" }} /> Избранное</Nav.Link>

										<NavDropdown
											title={<span><GroupIcon style={{ color: "Grey" }} /> Профиль</span>}
											id={`offcanvasNavbarDropdown-expand-${expand}`}
										>
											<NavDropdown.Item className="link_header" title="настройки" onClick={e => { e.preventDefault(); navigate("/setting") }}>
												<ManageAccountsIcon style={{ color: "Grey" }} /> Настройки
											</NavDropdown.Item>
											<NavDropdown.Divider />

											<NavDropdown.Item className="link_header" title="мой профиль" onClick={e => { e.preventDefault(); navigate(`/profile/${userId}`) }}>
												<ManageAccountsIcon style={{ color: "Grey" }} /> Обо мне </NavDropdown.Item>
											<NavDropdown.Divider />
											<NavDropdown.Item>
												<Button className="btn_header" title="Выход" onClick={exit}><ExitToAppIcon style={{ color: "Grey" }} /> Выход</Button>
											</NavDropdown.Item>
										</NavDropdown>
									</Nav>
									<Form size="sm" className="frmSearch" >
										<Form.Control
											style={{ height: "25px" }}
											className="w-175"
											size="sm"
											type="text"
											value={textSearch || ""}
											placeholder="поиск"
											aria-label="Search"
											onChange={(e) => { e.preventDefault(); setTextSearch(e.currentTarget.value) }}

										/>
										<Button className="btnSearch" onClick={search}>
											<SearchRoundedIcon style={{ fontSize: "20px" }} />
										</Button>

									</Form>
								</>}
							</Offcanvas.Body>
						</Navbar.Offcanvas>
					</Container>
				</Navbar>
			))
			}
			<Breadcrumbs />
		</Row >
	);
}

export default NavbarMenu;