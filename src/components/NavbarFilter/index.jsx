import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import AppCtx from "../../context.js"
import { filterArray } from "../../assets/mainPosts.js"
import { useNavigate } from 'react-router-dom';

function NavbarFilter() {
	const navigate = useNavigate()
	const {
		postsSrv,
		setTextSearch,
		userId
	} = useContext(AppCtx);
	const goSearch = (tag) => {
		if (userId) {
			setTextSearch(tag)
			navigate("/Search")
		}
		else {
			navigate("/auth")
		}

	}
	return (
		<Navbar bg="light" variant="light">
			<Container>
				<Nav className="justify-content-between flex-grow-1 pe-3">
					{filterArray?.map(e => <Nav.Link onClick={x => {
						x.preventDefault();
						goSearch(e.tag)
					}

					} key={e.id} href="#home">{e.tag}</Nav.Link>)}
				</Nav>
			</Container>
		</Navbar>
	)
}
export default NavbarFilter