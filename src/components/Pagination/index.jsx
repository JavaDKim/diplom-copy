import Item from "./Item"
import SortIcon from '@mui/icons-material/Sort';
import "./style.css"

const Pagination = ({ hk, setSort }) => {
	let items = [];
	for (let i = 0; i < hk.max; i++) {
		items.push(<Item
			val={i + 1}
			onClick={() => { hk.step(i + 1) }}
			active={hk.current === i + 1}
			key={"pag_" + i}
		/>)
	}
	return <><div className="pagination">
		<Item start onClick={() => { hk.step(1) }} />
		<Item prev onClick={hk.prev} />
		{items}
		<Item next onClick={hk.next} />
		<Item end onClick={() => { hk.step(hk.max) }} />
		<div className="sorting" onClick={() => setSort(old => !old)}><SortIcon /></div>
	</div>

	</>
}

export default Pagination;