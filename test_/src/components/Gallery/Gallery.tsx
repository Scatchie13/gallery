import { memo } from 'react'
import { DataProps } from '../../types/dataTypes'
import GalleryItem from '../GalleryItem/GalleryItem'
import styles from './Gallery.module.scss'

export interface GalleryProps {
	data: DataProps[]
	currentCards: DataProps[]
	handleDelete: (data: DataProps) => void
	handleSelect: (data: DataProps) => void
}

const Gallery = (props: GalleryProps) => {
	const { data, currentCards, handleDelete, handleSelect } = props

	return (
		<div className={styles.gallery}>
			<p>{data.length} ИЗОБРАЖЕНИЙ</p>
			<div className={styles.container}>
				{currentCards.map(el => (
					<div key={el.name}>
						<GalleryItem
							onDelete={() => handleDelete(el)}
							onSelect={() => handleSelect(el)}
							cardData={el}
						/>
					</div>
				))}
			</div>
		</div>
	)
}

export default memo(Gallery)
