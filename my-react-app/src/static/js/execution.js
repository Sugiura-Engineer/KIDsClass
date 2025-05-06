// @ts-ignore
import {classificationAlgorithm} from "../js/classificationAlgorithm.js"

export function classificationExecution(file){
  if(!file){
  alert("ファイルが選択されていません");
  return;
  }
  classificationAlgorithm();
};