import { useCallback, useEffect, useState } from 'react'
import Footer from './components/Footer/Footer'
import Gallery from './components/Gallery/Gallery'
import Pagination from './components/Pagination/Pagination'
import { DataProps } from './types/dataTypes'

import './App.scss'

function App() {
	const [data, setData] = useState<DataProps[]>([])
	const [currentPage, setCurrentPage] = useState<number>(1)
	const [cardPerPage] = useState<number>(6)
	const [selectedCount, setSelectedCount] = useState(0)
	const indexOfLastCard = currentPage * cardPerPage
	const indexOfFirstCard = indexOfLastCard - cardPerPage
	const currentCards = data.slice(indexOfFirstCard, indexOfLastCard)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch('../data/data.json')
				const data: DataProps[] = await response.json()
				const dataWithSelectedField = data.map(data => ({
					...data,
					selected: false,
				}))
				setData(dataWithSelectedField)
			} catch (error) {
				console.error('Ошибка', error)
			}
		}

		fetchData()
	}, [])

	const onPageChange = useCallback((pageNumber: number) => {
		setCurrentPage(pageNumber)
	}, [])

	const handleSelect = useCallback(
		(selectedData: DataProps) => {
			let newSelectedCount = selectedCount
			const updatedData = data.map(item => {
				if (item === selectedData) {
					newSelectedCount += !item.selected ? 1 : -1
					return { ...item, selected: !item.selected }
				}
				return item
			})
			setData(updatedData)
			setSelectedCount(newSelectedCount)
		},
		[data, selectedCount]
	)

	const handleDelete = useCallback(
		(deletedData: DataProps) => {
			const updatedData = data.filter(item => item !== deletedData)
			setData(updatedData)
		},
		[data]
	)

	const handleSelectAll = useCallback(() => {
		const allSelected = data.every(item => item.selected)

		if (allSelected) {
			const updatedData = data.map(item => ({ ...item, selected: false }))
			setData(updatedData)
			setSelectedCount(0)
		} else {
			const updatedData = data.map(item => ({ ...item, selected: true }))
			setData(updatedData)
			setSelectedCount(data.length)
		}
	}, [data])

	const handleDeleteSelected = useCallback(() => {
		const updatedData = data.filter(item => !item.selected)
		setData(updatedData)
	}, [data])

	const unselectAll = useCallback(() => {
    const updatedData = data.map(item => ({ ...item, selected: false }))
    setData(updatedData)
    setSelectedCount(0)
}, [data]);

	return (
		<div className='app'>
			<Gallery
				data={data}
				currentCards={currentCards}
				handleDelete={handleDelete}
				handleSelect={handleSelect}
			/>
			<Pagination
				currentPage={currentPage}
				totalPages={Math.ceil(data.length / cardPerPage)}
				onPageChange={onPageChange}
			/>
			<Footer
				selectedCount={selectedCount}
				onSelectAll={handleSelectAll}
				deleteAllSelected={handleDeleteSelected}
				unselectAll={unselectAll}
			/>
		</div>
	)
}

export default App
