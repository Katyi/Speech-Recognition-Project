import { FC, useEffect, useState } from 'react';
import style from './speachRecognition.module.css';
import "regenerator-runtime/runtime";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';


const speachRecognition: FC = () => {
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [textWithNumber, setTextWithNumber] = useState<string[]>([]);
  const defaulttext = "Включите микрофон и скажите что-нибудь";
  let textAndNumber = textWithNumber.join(" ");

  const addRandomNumber = () => {
    if (!transcript.length) return "";
    const someTextAndNumber = transcript.split(" ");
    const updatedTextAndNumber = [...textWithNumber];
    someTextAndNumber.forEach((item: string, index: number) => {
      const randomNumber = Math.floor(Math.random() * 100);
      updatedTextAndNumber[index] = item + randomNumber;
    });
    setTextWithNumber(updatedTextAndNumber);
  };

  useEffect(() => {
    addRandomNumber();
  }, [transcript]);

  useEffect(() => {
    SpeechRecognition.startListening({ continuous: true });
    return () => {
      SpeechRecognition.stopListening();
    };
  }, []);

  return (
    <div className={style.container}>
      <div className={style.title1}>Проект распознавания речи</div>
      <div className={style.TextAndNumberBox}>
        <div className={style.title2}>Текст со случайным числом:</div>
        {textAndNumber 
          ? <div className={style.title3}>{textAndNumber}</div>
          : <div className={style.title4}>{defaulttext}</div>
        }
      </div>
      <button onClick={() => {
        resetTranscript();
        setTextWithNumber([]);
      }}
      >
        Удалить
      </button>
    </div>
  )
}

speachRecognition.propTypes = {}

export default speachRecognition