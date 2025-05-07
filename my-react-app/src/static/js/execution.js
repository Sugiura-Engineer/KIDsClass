//全体統括ファイル.
//実行ボタン以降の複雑な処理を関数で実行.
//関数詳細は各jsへ.


// @ts-ignore
import {classificationAlgorithm} from "../js/classificationAlgorithm.js"

export function classificationExecution(file,classNumber,tableData){
  if(!file){
  alert("ファイルが選択されていません");
  return;
  }
  
  classificationAlgorithm(classNumber,tableData);
};