import { memo, useCallback, useState } from 'react'
import { MdDeleteOutline } from 'react-icons/md'
import { DataProps } from '../../types/dataTypes'
import styles from './GalleryItem.module.scss'

export interface GalleryItemProps {
	cardData: DataProps
	onSelect: (data: DataProps) => void
	onDelete: (data: DataProps) => void
}

const GalleryItem = (props: GalleryItemProps) => {
	const { cardData, onSelect, onDelete } = props
	const [hovered, setHovered] = useState(false)

	const handleMouseEnter = useCallback(() => {
		setHovered(true)
	}, [])

	const handleMouseLeave = useCallback(() => {
		setHovered(false)
	}, [])

	const handleCheckboxChange = useCallback(() => {
		onSelect(cardData)
	}, [cardData, onSelect])

	const handleDeleteClick = useCallback(() => {
		onDelete(cardData)
	}, [cardData, onSelect])

	return (
		<div
			className={styles.gallery}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			{(hovered || cardData.selected) && (
				<input
					type='checkbox'
					className={styles.checkbox}
					checked={cardData.selected}
					onChange={handleCheckboxChange}
					color='primary'
					style={{ display: hovered || cardData.selected ? 'block' : 'block' }}
				/>
			)}
			{
				<div>
					<img
						className={`${
							cardData.selected
								? styles.imageHover
								: hovered
								? styles.imageHover
								: styles.image
						}`}
						src={cardData.sample_url}
						alt={cardData.name}
					/>
					<h3 className={styles.header}>{cardData.name}</h3>
				</div>
			}

			{hovered && !cardData.selected && (
				<div className={styles.deleteBtn} onClick={handleDeleteClick}>
					<MdDeleteOutline size={25} />
				</div>
			)}
		</div>
	)
}

export default memo(GalleryItem)
