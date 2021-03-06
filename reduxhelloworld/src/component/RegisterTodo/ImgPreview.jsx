/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
import { ImageList, ImageListItem, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeImgName } from 'store/helloworld/helloworldSlice';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ImgPreview = ({ onChange }) => {
  const [src, setSrc] = useState([]);
  const [imgName, setImgName] = useState([]);
  const dispatch = useDispatch();
  // srcList로 담으면 onload의 비동기처리에 값이 먼저 할당되지않고 다음로직으로 넘어간다.
  // const srcList = [];
  const readMultipleImage = (input) => {
    console.log(input.target.files);
    if (input.target.files) {
      const fileArr = Array.from(input.target.files);
      // console.log(fileArr);
      fileArr.forEach((file) => {
        const reader = new FileReader();
        // console.log(file.name);
        setImgName((prev) => [...prev, file.name]);
        reader.onload = (e) => {
          setSrc((prev) => [...prev, e.target.result]);
          // srcList.push(e.target.result);
          // setSrc(srcList);
          // setSrc(e.target.result);
        };
        reader.readAsDataURL(file);
      });
      // eslint-disable-next-line no-param-reassign
      input.target.value = '';
    }
  };
  // const imgList = () => {
  //   if (src !== undefined) {
  //     src.map((res) => {
  //       console.log(res);
  //       return <img src={res} width='550px' height='350px' />;
  //     });
  //   }
  // };

  // store에 imgName 추가
  useEffect(() => {
    dispatch(changeImgName(imgName));
  }, [imgName]);
  const deleteImg = (event) => {
    console.log(event);
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0px',
  };
  const imgList = () => {
    // console.log(src);
    // console.log(imgName);
    return (
      !!src.length && (
        <Slider {...settings}>
          {src.map((value, idx) => (
            <img src={`${value}`} widthloading='lazy' />
          ))}
        </Slider>
        //
        // 아래 로직은 세로로 나온다 새로 짠 로직은 슬라이스가 가능한 로직
        //
        // <ImageList sx={{ width: 375 }} cols={1}>
        //   <Slider {...settings}>
        //     {src.map((value, idx) => (
        //       // eslint-disable-next-line react/no-array-index-key
        //       <ImageListItem key={`${value.substring(0, 10)}+${idx}`}>
        //         <img src={`${value}`} widthloading='lazy' />
        //       </ImageListItem>
        //     ))}
        //   </Slider>
        // </ImageList>
        // <div>
        //   {src.map((value, idx) => (
        //     // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
        //     <img
        //       // eslint-disable-next-line react/no-array-index-key
        //       key={`${value.substring(0, 10)}+${idx}`}
        //       src={value}
        //       width='550px'
        //       onClick={deleteImg}
        //     />
        //   ))}
        // </div>
      )
    );
  };

  return (
    <div>
      <div>
        <input
          type='file'
          accept='image/*'
          /* onChange에 두개이상의 함수가 들어가면 즉시실행함수와 이벤트인자를 직접 전달해야한다. */
          /* 한개만 있을땐 즉시실행함수와 인자를 리액트가 알아서해준다. */
          onChange={(e) => {
            onChange(e);
            readMultipleImage(e);
          }}
          multiple
        />
      </div>
      <div className='imgDiv'>{imgList()}</div>
    </div>
  );
};

export default ImgPreview;
