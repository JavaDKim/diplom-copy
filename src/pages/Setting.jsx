import { useContext, useEffect } from 'react';
import { Form, Row } from 'react-bootstrap';
import AppCtx from "../context.js"

const Setting = () => {
	const {
		setPostsSrvAll,
		postsSrvAll
	} = useContext(AppCtx);

	useEffect(() => {
		document.title = "Настройки пользователя";
	  }, []);


	return (
		<Row>
			<Form>
				<h4 style={{ marginBottom: "15px" }}>Настройки пользователя</h4>
				<Form.Check
					className="mb-3"// prettier-ignore
					type="switch"
					label={`Отображать все посты включая и тег "DiplomLk12"`}
					checked={postsSrvAll}
					onChange={e => { }}
					onClick={e => {
						if (e.currentTarget.checked) {
							setPostsSrvAll(true)
						}
						else {
							setPostsSrvAll(false)
						}
					}
					}
				/>
			</Form>

		</Row>
	);
}

export default Setting;
