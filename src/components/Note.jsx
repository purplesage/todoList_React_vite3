import React, { useState, useContext } from 'react';
import styles from '../styles/modules/note.module.css';
import { folderListContext } from '../context/FolderListContext';

import { CgClose } from 'react-icons/cg';

function Note({ noteId, noteTitle, folderID, noteBody }) {
	const [modalStyle, setModalStyle] = useState(false);

	const { handleDeleteNote } = useContext(folderListContext);

	const customStyle = () => {
		return {
			position: 'absolute',
			top: '35vh',
			right: '40vw',
			border: 'rgb(163, 45, 110) 4px dashed',
			transform: 'scale(1.3)',
		};
	};

	return (
		<div
			style={modalStyle ? customStyle() : null}
			onDoubleClick={() => setModalStyle(!modalStyle)}
			className={styles.note}
		>
			<div className={styles.noteTitleDiv}>
				<h2>{noteTitle}</h2>
				<button
					type="button"
					onClick={() => handleDeleteNote(noteId, folderID)}
				>
					<CgClose />
				</button>
			</div>
			<pre>
				<p>{noteBody}</p>
			</pre>
		</div>
	);
}

export default Note;
