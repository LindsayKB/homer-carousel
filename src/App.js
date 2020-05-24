import React, { Component, useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import ImageData from './carousel/carouselImages.json'
import Carousel from 'react-elastic-carousel';

//Common variables
const selectedImages = [];

class CarouselImages extends Component {
	 componentDidMount() {
        setInterval(() => {
            this.setState(() => {
                return { unseen: "does not display" }
            });
        }, 1000);
    }
	
	//Function to add images to image slider
	addImages(e) {
		//Variables
		var blueBorderImages = document.querySelectorAll(".image-container .blue-border");
		var imageOptions = document.querySelectorAll(".image-container");
		var imageGallery = document.querySelector(".image-gallery-container");
		var url, caption, newEntry, result;
		
		//Look for all selected images
		for(var i = 0; i < blueBorderImages.length; i++){
			//Get images names
			url = blueBorderImages[i].src;
			caption = blueBorderImages[i].getAttribute('data-caption');
			url = url.split('/').pop();
			
			//Prepare new entry for array
			newEntry = {imageName: url, imageCaption: caption};
			
			//Make sure the entry isn't already included in the array
			var result = selectedImages.filter(x => x.imageName === url);
			
			//If it isn't, push it in
			if (result <= 0)
			{
				selectedImages.push(newEntry);
			}
		}
		
		//Loop through all image options. Add a class to hide from image options 
		//Also, unselect all images
		for(var i = 0; i < imageOptions.length ; i++){
			if(imageOptions[i].children[0].classList.contains("blue-border")){ 
				imageOptions[i].classList.add("in-slider");
				imageOptions[i].classList.remove("blue-border");
			}
		}
		
		//Sort selected images alphabetically by caption
		selectedImages.sort( function( a, b ) {
			a = a.imageCaption.toLowerCase();
			b = b.imageCaption.toLowerCase();

			return a < b ? -1 : a > b ? 1 : 0;
		});
		
		//Reveal image gallery
		if (imageGallery.classList.contains("noOpacity")) {
			imageGallery.classList.remove("noOpacity");
		}
		
		//Disable Add button again
		document.querySelector(".add-btn").classList.add("disabled");
	}
	
	//Function to select image to include later in the image gallery
	selectImage(e) {
		//Variables	
		var results = 0;
		var button = document.querySelector(".add-btn");
		var blueBorderImages = document.getElementsByClassName("blue-border");
		
		//Determine if user is select or unselecting an image 
	   if( e.currentTarget.classList.contains('blue-border'))
	   {
		   e.currentTarget.classList.remove("blue-border");
	   }
	   else
	   {
		   e.currentTarget.classList.add("blue-border");
	   }
	   
	   //Check if any images are still selected. If they are none, disable button. If they are, leave it alone.
		for(var i = 0; i < blueBorderImages.length; i++){
			results++;
		}
		
		//If images are selected 
		if (results > 0) {
			//Make sure button actually contains disabled class
			if (button.classList.contains("disabled")) {
				button.classList.remove("disabled");
			}
		}
		else {
			//See if button contains disabled class already. If not, add class. If so, leave it alone. 
			if (!button.classList.contains("disabled")) {
				button.classList.add("disabled");
			}
		}
	 }
	render () {
		
		return (
		
			<div className="container">
				<div className="row page-title justify-content-center">
					<h1>Welcome to the Image Carousel</h1>
				</div>
				<div className="row instructions">
					<div className="col-md-12">
					<p>To use the image slider, select the images you want to include. Then press "Add". A slider will generate. 
					Hover over the slider to view each caption. Clicking on an image in the slider adds it to an image viewer, which
					will populate under the slider. Have fun!</p>
					</div>
				</div>
				<div className="row justify-content-center image-container-parent">
				{ImageData
				.sort((a, b) => a.imageCaption.localeCompare(b.imageCaption))
				.map((imageDetail, index) => {
				return <div key={index} className="image-container" >
						<img 
						className="no-border"
						id={imageDetail.imageName.toLowerCase().slice(0, -4)}
						data-caption={imageDetail.imageCaption}
						onClick={this.selectImage.bind(this)} 
						src={`../images/${imageDetail.imageName}`} />
						<div className="image-caption"><p>{imageDetail.imageCaption}</p></div>
						</div>
				})}
				</div>
				<div className="row justify-content-center">
					<button 
						type="button" 
						className="add-btn disabled"
						onClick={this.addImages.bind(this)} >Add</button>
				</div>
			</div>
		)
	}
}

class Slider extends Component {
	 componentDidMount() {
        setInterval(() => {
            this.setState(() => {
                return { unseen: "does not display" }
            });
        }, 1000);
    }
 constructor(props) {
    super(props);

  this.state = {
      selectedImages : selectedImages,
	  numOfItems : 3
  }

 }

	// Function to change state of number of items
	itemNumbers (e) {
	  this.setState({
		 numOfItems : parseInt(e.currentTarget.value, 10)
	  })
	  
	  //Variables
	  var sliderContainer = document.querySelector(".rec-carousel");
	  var arrayOfHeights = ["jwVqBu", "POjtK", "jBOUVk", "kyQlHw"];
	  var numOfItems = parseInt(e.currentTarget.value, 10);
	  var newClass;
	  
	  //Set new class name based on number selected
	  switch (numOfItems) {
		  case 2:
			newClass = arrayOfHeights[0];
			break;
		  case 3:
			newClass = arrayOfHeights[1];
			break;
		  case 4:
			newClass = arrayOfHeights[2];
			break;
		  case 5:
			newClass = arrayOfHeights[3];
			break;
	   }
	   
	   //Remove all instances of class names in carousel
	   for (var i = 0; i < arrayOfHeights.length; i++)
	   {
		   if (sliderContainer.classList.contains(arrayOfHeights[i])){
			   sliderContainer.classList.remove(arrayOfHeights[i]);
		   }
	   }
	   
	   //Add new class
	   sliderContainer.classList.add(newClass);
	   
	   //Prevent browser from jumping to the top 
	   e.preventDefault();

	}

	// Function to change to either View or Edit mode 
	modeChange (e) {
	  //Variables 
	  var deleteBtn = document.querySelector(".btn-danger");
	  var modeButtons = document.querySelectorAll(".image-gallery-options button");
	  var redBorderImages = document.querySelectorAll(".red-border");
	  
	  //Remove active-btn from both buttons
	  for(var i = 0; i < modeButtons.length; i++){
			if(modeButtons[i].classList.contains("active-btn")) {
				modeButtons[i].classList.remove("active-btn");
			}
	  }
	  
	  //Add active-btn to selected button
	  e.currentTarget.classList.add("active-btn");
	  
	  //If Edit mode is active, then reveal Delete button, but don't enable it yet 
	  if(document.querySelector(".btn-dark").classList.contains("active-btn")) {
		  deleteBtn.classList.remove("hidden");
	  }
	  
	  //If View mode is active, hide and disable Delete button 
	  else if (document.querySelector(".btn-info").classList.contains("active-btn")) {
			if(!deleteBtn.classList.contains("hidden")) {
				deleteBtn.classList.add("hidden");
			}
			if(!deleteBtn.classList.contains("disabled")) {
				deleteBtn.classList.add("disabled");
			}
			
			//If any images are still selected to delete, unselect all of them 
			for(var i = 0; i < redBorderImages.length; i++){
				redBorderImages[i].classList.remove("red-border");
			}
	  }
	}

	//Function to remove images from slider
	deleteImages (e) {
	  //Variables
	  var redBorderImages = document.querySelectorAll(".red-border");
	  var currentImageCaption = "";
	  var deleteBtn = document.querySelector(".btn-danger");
	  var imageOptions = document.querySelectorAll(".image-container");
	  var imageViewer = document.querySelector(".image-viewer");
	  var imageViewerImage = document.querySelector(".image-viewer img");
	  var imageViewerCaption = document.querySelector(".image-viewer .image-viewer-caption");
	  
	  //Get all images captions with red border
	  for(var i = 0; i < redBorderImages.length; i++){
			currentImageCaption = redBorderImages[i].getAttribute("data-caption");
			//Loop through selected images array. If caption matches a value, remove that image and update array
			for (var j = 0; j < selectedImages.length; j++) {
				if (selectedImages[j].imageCaption == currentImageCaption) {
					selectedImages.splice(j, 1);
				}
					//Add images back to image choices
					 for(var k = 0; k < imageOptions.length; k++){
						if (imageOptions[k].querySelector("img").src == redBorderImages[i].src ) {
							imageOptions[k].classList.remove("in-slider");
							imageOptions[k].querySelector("img").classList.remove("blue-border");
						}
					} 
				}
			//If the picture is in the Image Viewer, remove 
			if (imageViewerImage.src == redBorderImages[i].src)
			{
				imageViewerImage.src = "";
				imageViewerCaption.textContent = "";
				imageViewer.classList.add("noOpacity");
			}
			//Remove red border
			redBorderImages[i].classList.remove("red-border");
		}
		
		//Disable delete button
		deleteBtn.classList.add("disabled");
		
	}

	//Function to put image in viewer below slider or select to delete
	selectGalleryImage (e) {
	  //Variables
	  var deleteBtn = document.querySelector(".btn-danger");
	  var imageViewer = document.querySelector(".image-viewer");
	  var imageViewerImage = document.querySelector(".image-viewer img");
      var imageViewerCaption = document.querySelector(".image-viewer .image-viewer-caption");
	  var redBorderResults = 0;
	  var currentMode = document.querySelector(".active-btn").getAttribute("data-option");
	  var currentCaption, currentImage, redBorderImages;
	  
	  //If the current mode is "View", place image in Image Viewer
	  if (currentMode == "View") {
		 imageViewer.classList.remove("noOpacity");
		 currentCaption = e.currentTarget.getAttribute("data-caption");
		 currentImage = e.currentTarget.src;
		 imageViewerImage.src = currentImage;
		 imageViewerCaption.textContent = currentCaption;
	  }
	  
	  //Image is selected to be deleted
	  else if (currentMode == "Edit") {
		  
		  //Check if image is already selected. If it is, unselect. If it isn't, select
		  if (e.currentTarget.classList.contains("red-border")) {
				  /*Do nothing*/
				e.currentTarget.classList.remove("red-border");
		  }  
		  else {
			  e.currentTarget.classList.add("red-border");
		  }
		  
		  //Search for any images that are still selected to be deleted. 
		  //If there are any, leave Delete button alone. If not, disable Delete button
		  redBorderImages = document.querySelectorAll(".red-border");
			for(var i = 0; i < redBorderImages.length; i++){
				redBorderResults++;
			}
			if (redBorderResults > 0) {
				if (deleteBtn.classList.contains("disabled")) {
					deleteBtn.classList.remove("disabled");
				}
			}
			else {
				if (!deleteBtn.classList.contains("disabled")) {
					deleteBtn.classList.add("disabled");
				}
			}
		}
	}

	// Functions to show/hide image captions on hover 
	showCaption(e) {
		e.currentTarget.querySelector(".image-gallery-caption").style.opacity = 100;
	}
	hideCaption(e) {
		e.currentTarget.querySelector(".image-gallery-caption").style.opacity = 0;
	}
	 render() {
	 const allImages = selectedImages.map((slide,index) => 
				<div key={index} className="slide" onMouseOver={this.showCaption.bind(this)} onMouseOut={this.hideCaption.bind(this)}>
				<img src={"../images/" + slide.imageName} 
				data-caption={slide.imageCaption}
				onClick={this.selectGalleryImage.bind(this)} />
				<div className="image-gallery-caption"><p>{slide.imageCaption}</p></div></div>
		 )
		 return (
			<div className="container image-gallery-container noOpacity">
			<div className="row image-gallery-options">
				<div className="col-md-6">
					<label><strong>Select number of items to show at a time:</strong></label>
						<select className="number-of-items" value={this.state.numOfItems} onChange={this.itemNumbers.bind(this)}>
							<option>2</option>
							<option>3</option>
							<option>4</option>
							<option>5</option>
						</select>
				</div>
				<div className="col-md-6">
					<button type="button" className="btn btn-info active-btn" data-option="View" onClick={this.modeChange.bind(this)}>View</button>
					<button type="button" className="btn btn-dark" data-option="Edit" onClick={this.modeChange.bind(this)}>Edit</button>
					<button type="button" className="btn btn-danger hidden disabled" data-option="Delete" onClick={this.deleteImages.bind(this)}>Delete</button>
				</div>
			</div>
			<div className="row image-gallery justify-content-center">
			<span className="carousel__control js-carousel-prev"><i className="icon"></i></span>
				<Carousel itemsToShow={this.state.numOfItems} itemsToScroll={this.state.numOfItems}>
				{allImages }
				</Carousel>
			<span className="carousel__control js-carousel-next"><i className="icon"></i></span>
			</div>
			</div>
		 )
       
    }
}

class ImageViewer extends Component { 
	 render() {
		 return (
			<div className="container image-viewer justify-content-center noOpacity">
				<div className="row">
					<div className="col-md-12">
						<img src=""/>
						<span className="image-viewer-caption"></span>
					</div>
				</div>
			</div>
		 )
       
    }
}


class App extends Component {
	render () {
		return (
			<div className='App'>
				<CarouselImages />
				<Slider />
				<ImageViewer />
			</div>
		)
	}
}

export default App;
