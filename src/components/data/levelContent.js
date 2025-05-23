const levelContent = [
  {
    level: 1,
    sections: [
      {
        title: "தமிழ் எழுத்துக்கள்",
        content: ["ட்", "ட", "ப்", "ப", "ய்", "ய", "அ", "இ"],
        description: "தமிழ் மொழியின் தனி எழுத்துக்களை பயிற்சி செய்யுங்கள்."
      },
      {
        title: "உயிர் எழுத்துக்கள்",
        content: ["அ", "ஆ", "இ", "ஈ", "உ", "ஊ", "எ", "ஏ", "ஐ", "ஒ", "ஓ", "ஔ"],
        description: "தமிழ் உயிர் எழுத்துக்களை பயிற்சி செய்யுங்கள்."
      }
    ]
  },
  {
    level: 2,
    sections: [
      {
        title: "இரண்டு எழுத்து சொற்கள்",
        content: ["பிடி", "அடி", "குதி", "மடி", "விடு"],
        description: "இரண்டு எழுத்து கொண்ட எளிய தமிழ் சொற்களை பயிற்சி செய்யுங்கள்."
      },
      {
        title: "வேறுபட்ட எழுத்துகளுடன் இரண்டு எழுத்து சொற்கள்",
        content: ["கை", "பை", "மை", "வை", "தை"],
        description: "வேறுபட்ட எழுத்துகளுடன் இரண்டு எழுத்து சொற்களை பயிற்சி செய்யுங்கள்."
      }
    ]
  },
  {
    level: 3,
    sections: [
      {
        title: "மூன்று எழுத்து சொற்கள்",
        content: ["பலகை", "முதலை", "கோடை", "வரவு", "படகு"],
        description: "மூன்று எழுத்து கொண்ட தமிழ் சொற்களை பயிற்சி செய்யுங்கள்."
      },
      {
        title: "நான்கு எழுத்து சொற்கள்",
        content: ["பழத்தை", "மரத்தை", "கடத்தை", "வரதட்சணை"],
        description: "நான்கு எழுத்து கொண்ட தமிழ் சொற்களை பயிற்சி செய்யுங்கள்."
      }
    ]
  },
  {
    level: 4,
    sections: [
      {
        title: "எளிய சொற்றொடர்கள்",
        content: ["பழத்தை வெட்டினான்", "நாளை வருவேன்", "படத்தை பார்த்தேன்"],
        description: "எளிய தமிழ் சொற்றொடர்களை பயிற்சி செய்யுங்கள்."
      },
      // {
      //   title: "பொதுவான சொற்றொடர்கள்",
      //   content: ["வணக்கம்", "நன்றி", "மன்னிக்கவும்", "எப்படி இருக்கிறீர்கள்?"],
      //   description: "பொதுவாக பயன்படுத்தப்படும் தமிழ் சொற்றொடர்களை பயிற்சி செய்யுங்கள்."
      // }
    ]
  },
  {
    level: 5,
    sections: [
      {
        title: "எளிய வாக்கியங்கள்",
        content: ["அவன் வீட்டிற்கு போனான்.", "நான் பள்ளிக்கு செல்கிறேன்.", "அவள் புத்தகம் படித்தாள்."],
        description: "எளிய தமிழ் வாக்கியங்களை பயிற்சி செய்யுங்கள்."
      },
      // {
      //   title: "தினசரி பயன்பாட்டு வாக்கியங்கள்",
      //   content: ["நான் காலையில் எழுந்தேன்.", "அவர் வேலைக்கு சென்றார்.", "நாங்கள் சாப்பிட்டோம்."],
      //   description: "தினசரி பயன்பாட்டு தமிழ் வாக்கியங்களை பயிற்சி செய்யுங்கள்."
      // }
    ]
  },
  {
    level: 6,
    sections: [
      {
        title: "சிக்கலான வாக்கியங்கள்",
        content: ["தமிழ் மொழி இந்தியாவின் பழமையான மொழிகளில் ஒன்றாகும்.", "அவன் படித்த புத்தகம் மிகவும் சுவாரஸ்யமாக இருந்தது.", "நாங்கள் விடுமுறையில் கிராமத்திற்கு சென்றோம்."],
        description: "சிக்கலான தமிழ் வாக்கியங்களை பயிற்சி செய்யுங்கள்."
      },
      // {
      //   title: "இணைப்புச் சொற்களுடன் வாக்கியங்கள்",
      //   content: ["நான் பள்ளிக்கு சென்றேன் மற்றும் படித்தேன்.", "அவள் வீட்டிற்கு வந்தாள் ஆனால் பேசவில்லை.", "நாங்கள் சாப்பிட்டோம் பிறகு விளையாடினோம்."],
      //   description: "இணைப்புச் சொற்களுடன் தமிழ் வாக்கியங்களை பயிற்சி செய்யுங்கள்."
      // }
    ]
  },
  {
    level: 7,
    sections: [
      {
        title: "குறுந்தொடர்கள்",
        content: ["தமிழ் மொழி மிகவும் பழமையானது. இது இந்தியாவின் முக்கிய மொழிகளில் ஒன்றாகும். தமிழ் மொழியில் பல பழைய இலக்கியங்கள் உள்ளன.", "நான் ஒரு சிறுவனாக இருந்தபோது, எங்கள் கிராமத்தில் பல மரங்கள் இருந்தன. நாங்கள் அந்த மரங்களில் ஏறி விளையாடுவோம்."],
        description: "குறுந்தொடர்களை படித்து பயிற்சி செய்யுங்கள்."
      }
    ]
  },
  {
    level: 8,
    sections: [
      {
        title: "விளக்கமான தொடர்கள்",
        content: ["கடல் நீரின் நீல நிறம் மிகவும் அழகாக இருக்கிறது. அலைகள் மெதுவாக கரையை அடைகின்றன. கடற்கரையில் மணல் மிகவும் மென்மையாக உள்ளது.", "மலைகள் மேகங்களால் மூடப்பட்டிருக்கின்றன. மரங்கள் பச்சை நிறத்தில் ஒளிர்கின்றன. பறவைகள் கூடு கட்டி வாழ்கின்றன."],
        description: "விளக்கமான தொடர்களை படித்து பயிற்சி செய்யுங்கள்."
      }
    ]
  },
  {
    level: 9,
    sections: [
      {
        title: "கதைப்பாணி தொடர்கள்",
        content: ["ஒரு நாள், ஒரு சிறுவன் காட்டில் சென்றான். அவன் ஒரு மரத்தின் கீழ் உட்கார்ந்தான். அப்போது, ஒரு மான் அருகில் வந்தது.", "ஒரு பெண் தன் வீட்டில் இருந்து வெளியே வந்தாள். அவள் ஒரு பூங்காவிற்கு சென்றாள். அங்கே, அவள் பல பூக்களை பார்த்தாள்."],
        description: "கதைப்பாணி தொடர்களை படித்து பயிற்சி செய்யுங்கள்."
      }
    ]
  },
  {
    level: 10,
    sections: [
      {
        title: "நீண்ட தொடர்கள்",
        content: ["தமிழ்நாட்டின் வரலாறு மிகவும் பழமையானது. இங்கு பல பழைய கோயில்கள் உள்ளன. இந்த கோயில்கள் பல நூற்றாண்டுகளாக நின்று கொண்டிருக்கின்றன. தமிழ்நாட்டின் கலாச்சாரம் மிகவும் பண்பட்டது.", "நான் சிறுவனாக இருந்தபோது, எங்கள் கிராமத்தில் பல விழாக்கள் நடைபெறும். அந்த விழாக்களில் நாங்கள் அனைவரும் கலந்து கொள்வோம். அப்போது, எங்கள் கிராமம் மிகவும் சுறுசுறுப்பாக இருக்கும்."],
        description: "நீண்ட தொடர்களை படித்து பயிற்சி செய்யுங்கள்."
      }
    ]
  },
  {
    level: 11,
    sections: [
      {
        title: "வரலாற்று தொடர்கள்",
        content: ["சோழர்கள் தமிழ்நாட்டை ஆண்ட பழைய மன்னர்கள். அவர்கள் பல கோயில்களை கட்டினார்கள். இந்த கோயில்கள் இன்றும் நமக்கு அழகை தருகின்றன.", "பல்லவர்கள் தமிழ்நாட்டின் மற்றொரு பழைய வம்சம். அவர்கள் கலை மற்றும் கட்டிடக்கலையில் மிகவும் பிரபலமானவர்கள். மாமல்லபுரம் அவர்களின் கட்டிடக்கலையின் ஒரு உதாரணம்."],
        description: "வரலாற்று தொடர்களை படித்து பயிற்சி செய்யுங்கள்."
      }
    ]
  },
  {
    level: 12,
    sections: [
      {
        title: "கலாச்சார தொடர்கள்",
        content: ["தமிழ்நாட்டின் பாரம்பரிய நடனம் பரதநாட்டியம். இந்த நடனம் மிகவும் அழகாக இருக்கிறது. இது பல நூற்றாண்டுகளாக நடைபெற்று வருகிறது.", "தமிழ்நாட்டின் பாரம்பரிய இசை கர்நாடக இசை. இந்த இசை மிகவும் இனிமையாக இருக்கிறது. இது பல பாடல்களை கொண்டுள்ளது."],
        description: "கலாச்சார தொடர்களை படித்து பயிற்சி செய்யுங்கள்."
      }
    ]
  },
  {
    level: 13,
    sections: [
      {
        title: "அறிவியல் தொடர்கள்",
        content: ["விண்வெளி என்பது மிகவும் பரந்தது. இதில் பல கோள்கள் மற்றும் நட்சத்திரங்கள் உள்ளன. விண்வெளியை பற்றி பல விஞ்ஞானிகள் ஆராய்ந்து வருகின்றனர்.", "மனித உடல் மிகவும் சிக்கலானது. இதில் பல உறுப்புகள் உள்ளன. ஒவ்வொரு உறுப்பும் ஒரு குறிப்பிட்ட பணியை செய்கிறது."],
        description: "அறிவியல் தொடர்களை படித்து பயிற்சி செய்யுங்கள்."
      }
    ]
  },
  {
    level: 14,
    sections: [
      {
        title: "இலக்கிய தொடர்கள்",
        content: ["தமிழ் இலக்கியம் மிகவும் பழமையானது. இதில் பல பழைய நூல்கள் உள்ளன. இந்த நூல்கள் தமிழ் மொழியின் செல்வம்.", "திருக்குறள் தமிழ் இலக்கியத்தின் ஒரு பகுதி. இது மிகவும் புகழ் பெற்ற நூல். இது பல அறிவுரைகளை கொண்டுள்ளது."],
        description: "இலக்கிய தொடர்களை படித்து பயிற்சி செய்யுங்கள்."
      }
    ]
  },
  {
    level: 15,
    sections: [
      {
        title: "தத்துவ தொடர்கள்",
        content: ["வாழ்க்கை என்பது ஒரு பயணம். இதில் பல சோதனைகள் வரும். இந்த சோதனைகளை சமாளித்தால் மட்டுமே வாழ்க்கையில் வெற்றி பெற முடியும்.", "மனிதர்கள் ஒருவருக்கொருவர் உதவி செய்ய வேண்டும். இதுதான் மனிதாபிமானம். இது வாழ்க்கையை மிகவும் அர்த்தமுள்ளதாக ஆக்குகிறது."],
        description: "தத்துவ தொடர்களை படித்து பயிற்சி செய்யுங்கள்."
      }
    ]
  },
  {
    level: 16,
    sections: [
      {
        title: "மேம்பட்ட தொடர்கள்",
        content: ["மனித வாழ்க்கையின் அனைத்து பரிமாணங்களிலும் அறிவியல் மற்றும் தொழில்நுட்பம் ஒரு முக்கியமான பாத்திரம் வகிக்கின்றது. காலம் கடந்து முன்னேறிய மனித சமூகங்கள் எப்போதும் அறிவியல் வளர்ச்சியின் அடிப்படையில் முன்னேறி வருகின்றன. பழங்காலத்திலிருந்து மனிதர்கள் இயற்கையின் ரகசியங்களை ஆராய்ந்து, அவற்றை புரிந்து கொண்டு, அவற்றை தமது வாழ்வில் பயன்படுத்த முயன்றனர். அதனால் தான் மனித சமூகம் வேகமாக வளர்ந்து, பல புதிய கண்டுபிடிப்புகள் மற்றும் கண்டுபிடிப்பு முறைகள் உருவாகின."],
        description: "மேம்பட்ட தொடர்களை படித்து பயிற்சி செய்யுங்கள்."
      }
    ]
  }
];

export default levelContent;