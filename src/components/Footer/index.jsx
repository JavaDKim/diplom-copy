import { Card } from 'react-bootstrap';
import NavbarFooter from '../NavbarFooter';
function Footer() {
	return (
		<>
			<Card className="text-white p-0" style={{  /* position: "relative"  */ }}>
				<Card.Img src={require("../../assets/images/footer.png")} />
				<Card.ImgOverlay>
					<Card.Title>Card title</Card.Title>
					<Card.Text>
					</Card.Text>
					<Card.Text>Last updated 3 mins ago</Card.Text>
					<Card.Footer /* style={{ display: "flex", alignItems: "center", height: "150px", left: "0", bottom: "0", width: "100%", position: "absolute", border: "none", backgroundColor: "rgba(0, 0, 0, 0.5)", }} */></Card.Footer>
				</Card.ImgOverlay>
			</Card>
		</>
	);
}

export default Footer;