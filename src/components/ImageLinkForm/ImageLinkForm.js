import React from 'react'
import './ImageLinkForm.css'

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
	return (
		<div className="">
			<p className="f3">
				{'This Magic brain will detect faces un your pictures. Git it a Try'}
			</p>
			<div className="center">
				<div className="pa4 br3 shadow-5 form center">
					<input type="text" className="f4 pa2 w-70 center" 
					onChange={ onInputChange } />
					<button className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple pointer"
					onClick={ onButtonSubmit }>
						Detect
					</button>
				</div>
			</div>
		</div>
		);
}

export default ImageLinkForm;