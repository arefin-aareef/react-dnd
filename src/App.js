
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './App.css';

const imageLists = [
	{
		id: '1',
		thumb: '/images/image-1.webp',
	},
	{
		id: '2',
		thumb: '/images/image-2.webp',
	},
	{
		id: '3',
		thumb: '/images/image-3.webp',
	},
	{
		id: '4',
		thumb: '/images/image-4.webp',
	},
	{
		id: '5',
		thumb: '/images/image-5.webp',
	},
	{
		id: '6',
		thumb: '/images/image-6.webp',
	},
	{
		id: '7',
		thumb: '/images/image-7.webp',
	},
	{
		id: '8',
		thumb: '/images/image-8.webp',
	},
	{
		id: '9',
		thumb: '/images/image-9.webp',
	},
	{
		id: '10',
		thumb: '/images/image-10.jpeg',
	},
	{
		id: '11',
		thumb: '/images/image-11.jpeg',
	},
];
function App() {
  const [images, setImages] = useState(imageLists);
  const [selectedImages, setSelectedImages] = useState([]);

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(images);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setImages(items);
  }

  function handleImageClick(id) {
    const selectedIndex = selectedImages.indexOf(id);
    if (selectedIndex === -1) {
      setSelectedImages([...selectedImages, id]);
    } else {
      const newSelectedImages = [...selectedImages];
      newSelectedImages.splice(selectedIndex, 1);
      setSelectedImages(newSelectedImages);
    }
  }

  function handleDeleteSelected() {
    const remainingImages = images.filter((image) => !selectedImages.includes(image.id));
    setImages(remainingImages);
    setSelectedImages([]);
  }

  return (
		<div className='container'>
			<div className='gallery'>
				<div className='button-container'>
					<div className='selected-count'>
						{selectedImages.length === 0
							? 'Gallery'
							: `${selectedImages.length} ${
									selectedImages.length <= 1 ? 'File' : 'Files'
							  } Selected`}
					</div>
					{selectedImages.length > 0 && (
						<div className='delete-button'>
							<button onClick={handleDeleteSelected}>
								Delete {selectedImages.length <= 1 ? 'file' : 'files'}
							</button>
						</div>
					)}
				</div>

				<DragDropContext onDragEnd={handleOnDragEnd}>
					<Droppable droppableId='characters' direction='horizontal'>
						{provided => (
							<div
								className='grid-container'
								{...provided.droppableProps}
								ref={provided.innerRef}
							>
								{images.map(({ id, thumb }, index) => {
									const isSelected = selectedImages.includes(id);
									return (
										<Draggable key={id} draggableId={id} index={index}>
											{provided => (
												<div
													className={`imgContainer ${
														isSelected ? 'selected' : ''
													}`}
													ref={provided.innerRef}
													{...provided.draggableProps}
													{...provided.dragHandleProps}
												>
													<img
														className='image'
														src={thumb}
														alt='Thumb'
														onClick={() => handleImageClick(id)}
													/>
													<input
														type='checkbox'
														checked={isSelected}
														onChange={() => handleImageClick(id)}
													/>
												</div>
											)}
										</Draggable>
									);
								})}
								{provided.placeholder}
							</div>
						)}
					</Droppable>
				</DragDropContext>
			</div>
		</div>
	);
}

export default App;
