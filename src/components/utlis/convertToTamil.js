  
import phoneticMap from "../data/phoneticMap.json"
  
export default function convertToTamil(text) {

  
    let tamilText = "";
    let i = 0;
  
    while (i < text.length) {
      let found = false;
      for (let len = 5; len >= 1; len--) {
        if (i + len <= text.length) {
          const englishSeq = text.substring(i, i + len);
          if (phoneticMap[englishSeq]) {
            tamilText += phoneticMap[englishSeq];
            i += len;
            found = true;
            break;
          }
        }
      }
  
      if (!found) {
        tamilText += text[i];
        i++;
      }
    }
  
    return tamilText // Normalize the Tamil text
  }