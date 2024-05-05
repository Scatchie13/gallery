import { memo, useCallback, useEffect } from 'react'

import { MdDeleteOutline } from 'react-icons/md'
import styles from './Footer.module.scss'

export interface FooterProps {
	selectedCount: number
	onSelectAll: () => void
	deleteAllSelected: () => void
	unselectAll: () => void
}

const Footer = (props: FooterProps) => {
	const { onSelectAll, deleteAllSelected, selectedCount, unselectAll } = props

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown)

		return () => {
			document.removeEventListener('keydown', handleKeyDown)
		}
	}, [])

	const handleKeyDown = useCallback(
		(event: KeyboardEvent) => {
			if (event && event.key === 'Escape') {
				unselectAll()
			}
		},
		[unselectAll]
	)

	return (
		<section className={styles.footer}>
			<div className={styles.btnContainer}>
				<button className={styles.btn} onClick={onSelectAll}>
					—
				</button>
				<div className={styles.shevron}>{selectedCount}</div>
			</div>
			<MdDeleteOutline
				style={{ marginLeft: 90 }}
				cursor='pointer'
				size={30}
				onClick={deleteAllSelected}
			/>
			<p>Для отмены нажмите ESC</p>
		</section>
	)
}

export default memo(Footer)
