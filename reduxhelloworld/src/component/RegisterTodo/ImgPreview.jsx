/* eslint-disable jsx-a11y/click-events-have-key-events */
import { ImageList, ImageListItem } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeImgName } from 'store/helloworld/helloworldSlice';

const ImgPreview = () => {
  const [src, setSrc] = useState([]);
  const [imgName, setImgName] = useState([]);
  const dispatch = useDispatch();
  // srcList로 담으면 onload의 비동기처리에 값이 먼저 할당되지않고 다음로직으로 넘어간다.
  // const srcList = [];
  const readMultipleImage = (input) => {
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

  const imgList = () => {
    // console.log(src);
    // console.log(imgName);
    return (
      !!src.length && (
        <ImageList sx={{ width: 1200 }} cols={3}>
          {src.map((value, idx) => (
            // eslint-disable-next-line react/no-array-index-key
            <ImageListItem key={`${value.substring(0, 10)}+${idx}`}>
              <img src={`${value}`} widthloading='lazy' />
            </ImageListItem>
          ))}
        </ImageList>
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
        <input type='file' onChange={readMultipleImage} multiple />
      </div>
      <div className='imgDiv'>{imgList()}</div>
    </div>
  );
};

export default ImgPreview;
