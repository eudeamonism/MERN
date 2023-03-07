import React, { useState, useContext } from 'react';
import { AuthContext } from '../../shared/context/auth-context';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import './PlaceItem.css';
import MapChart from '../../shared/components/UIElements/Map';
//Here we are receiving props. We only use props.<name> and not what we map, which was the param place.
const PlaceItem = (props) => {
	const auth = useContext(AuthContext);
	const [showMap, setShowMap] = useState(false);
	const [showConfirmModal, setShowConfirmModal] = useState(false);

	const openMapHandler = () => setShowMap(true);
	const closeMapHandler = () => setShowMap(false);

	const showDeleteWarningHandler = () => {
		setShowConfirmModal(true);
	};
	const cancelDeleteWarningHandler = () => {
		setShowConfirmModal(false);
	};

	const confirmDeleteHandler = () => {
		setShowConfirmModal(false);
		console.log('Deleting not really because need DB');
	};

	return (
		<>
			<Modal
				show={showMap}
				onCancel={closeMapHandler}
				header={props.address}
				contentClass="place-item__modal-content"
				footerClass="place-item__modal-actions"
				footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
			>
				<div className="map-container">
					<MapChart />
				</div>
			</Modal>
			<Modal
				show={showConfirmModal}
				onCancel={cancelDeleteWarningHandler}
				header="Are you sure?"
				footerClass="place-item__modal-actions"
				footer={
					<>
						<Button inverse onClick={cancelDeleteWarningHandler}>
							CANCEL
						</Button>
						<Button danger onClick={confirmDeleteHandler}>
							DELETE
						</Button>
					</>
				}
			>
				<p>
					Do you want to proceed and this delete this place? Please note that it
					can not be undone thereafter.
				</p>
			</Modal>
			<li className="place-item">
				<Card className="place-item__content">
					<div className="place-item__image">
						<img src={props.image} alt={props.title} />
					</div>
					<div className="place-item__info">
						<h2>{props.title}</h2>
						<h3>{props.address}</h3>
						<p>{props.description}</p>
					</div>
					<div>
						<div className="place-item__actions">
							<Button inverse onClick={openMapHandler}>
								VIEW ON MAP
							</Button>
                            {auth.isLoggedIn && <Button to={`/places/${props.id}`}>EDIT</Button>}
							{auth.isLoggedIn && <Button danger onClick={showDeleteWarningHandler}>
								DELETE
							</Button>}
						</div>
					</div>
				</Card>
			</li>
		</>
	);
};

export default PlaceItem;
