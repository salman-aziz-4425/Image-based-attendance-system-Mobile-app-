import { API, Amplify, graphqlOperation } from "aws-amplify";
import { getS3Url } from '../src/graphql/queries';
import axios from 'axios';
export const conversion = async (array, rollNumbers) => {
  array = array.filter((user) => {
    let index = rollNumbers.findIndex((user1) => {
      return user.rollNumber === user1 && user.faceConf > 80
    })
    return index != -1
  })
  return array
}
export const removal = async (finalresponse) => {
  const res = []
  console.log("In removal", finalresponse)
  console.log("In removal", finalresponse.length)
  for (let i = 0; i < finalresponse.length; i++) {
    let el = finalresponse[i]
    console.log(el)
    const index = res.findIndex(obj => {
      return obj['rollNumber'] === el.rollNumber;
    });
    if (index === -1) {
      res.push({
        "rollNumber": el.rollNumber,
        "faceConf": el.faceConf,
        "count": 1
      })
    }
    else {
      res[index]["count"]++;
    };
  }
  return res
}
export const storeImageToS3Bucket = async (GroupImage) => {
  console.log("Group Image=>", GroupImage)
  if (GroupImage === undefined || GroupImage.length < 1) {
    alert("no pic image");
    setError({ ...error, image: "Kindly upload your picture" });
    return;
  }
  const image = GroupImage;
  // const base64String = await FileSystem.readAsStringAsync(result.uri, { encoding: FileSystem.EncodingType.Base64 });

  // // Create Blob object with data
  // const blob = new Blob([Buffer.from(base64String, 'base64')], { type: result.type });

  // Upload blob to S3 bucket


  //  Get Secure URL from our server
  const res = await API.graphql(graphqlOperation(getS3Url));
  //  Post the image directly to S3 bucket
  const s3obj = res.data.getS3Url;
  await axios.put(s3obj?.s3Url, image, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
    .then((res) => {
      console.log("Bucket Res ", res, " s3obj ", s3obj?.key);
    })
    .catch((err) => {
      console.log("Error => ", err);
      console.log(" => ", err);

      return undefined;
    });
  return s3obj?.key;
}

