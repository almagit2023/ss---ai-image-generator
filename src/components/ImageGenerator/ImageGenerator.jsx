import React, { useRef, useState } from 'react'
import './ImageGenerator.css'
import default_image from '../Assets/default_image.svg'

const ImageGenerator = () => {

  const [imgUrl, setImgUrl] = useState("/")
  let inputRef = useRef(null);

  const imageGenerator = async () => {
    if (inputRef.current.value === "") {
      return 0
    }

    const response = await fetch("url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer API-KEY"
      },
      body: JSON.stringify({
        prompt: `${inputRef.current.value}`,
        n: 1,
        size: "512x512",
      })
    })
    let data = await response.json();
    let data_array = data.data;
    setImgUrl(data_array[0].url);

    console.log(data_array[0])

  }
  return (
    <div className="aiImageGenerator">
      <div className="header">AI IMAGE <span>GENERATOR</span></div>
      <div className="image-loading">
        <div className="image">
          <img src={imgUrl === "/" ? default_image : imgUrl} alt="" />
        </div>
      </div>
      <div className="search-box">
        <input type="text" name="" id="" ref={inputRef} className='search-input' placeholder='Describe your image in text' />
        <div className="generate-btn" onClick={() => { imageGenerator() }} >Generate</div>
      </div>
    </div>
  )
}

export default ImageGenerator