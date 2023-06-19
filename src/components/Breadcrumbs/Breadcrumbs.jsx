import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Breadcrumb } from 'react-bootstrap';
import "./style.css"

const Breadcrumbs = () => {
	const location = useLocation()
	let currentLink = ""
	const ok = location.pathname !== "/"
	const navigate = useNavigate()

	return (<>{ok && <Breadcrumb >
		<Breadcrumb.Item className='breadItem' onClick={e => { e.preventDefault(); navigate("/") }} >Home</Breadcrumb.Item>
		<Breadcrumb.Item className='breadItem' onClick={e => { e.preventDefault(); navigate("/posts") }} >Посты</Breadcrumb.Item>
		{location.pathname.split('/').filter(crumb => crumb !== '').map(crumb => {
			currentLink = `/${crumb}`
			return <Breadcrumb.Item className='breadItem' active key={crumb} href={currentLink}>
				{crumb}
			</Breadcrumb.Item>
		})}

		{/* 			<Breadcrumb.Item active className='breadItem' href={location.pathname} >{String(location.pathname).slice(1)}</Breadcrumb.Item> */}
	</Breadcrumb>
	}
	</>);

}
export default Breadcrumbs

