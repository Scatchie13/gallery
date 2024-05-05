import { memo } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import './Pagination.scss'

export interface PaginationProps {
	currentPage: number
	totalPages: number
	onPageChange: (index: number) => void
}

const Pagination = (props: PaginationProps) => {
	const { currentPage, totalPages, onPageChange } = props
	const pageNumbers = Array.from(
		{ length: totalPages },
		(_, index) => index + 1
	)

	return (
		<div className='pagination'>
			<button
				className='paginationBtn left'
				disabled={currentPage === 1}
				onClick={() => onPageChange(currentPage - 1)}
			>
				<FiChevronLeft size={25} />
			</button>
			{pageNumbers.map(page => (
				<button
					key={page}
					className={currentPage === page ? 'btn active' : 'btn'}
					onClick={() => onPageChange(page)}
				>
					{page}
				</button>
			))}
			<button
				disabled={currentPage === totalPages}
				onClick={() => onPageChange(currentPage + 1)}
				className='paginationBtn'
			>
				<FiChevronRight size={25} />
			</button>
		</div>
	)
}

export default memo(Pagination)
