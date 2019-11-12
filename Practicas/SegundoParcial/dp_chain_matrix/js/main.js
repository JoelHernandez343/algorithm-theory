// Joel Harim Hernández Javier
// Grupo 3CM4

import { matrixChainOrden } from './chainMatrix.js';

let isNumber = /^(\d)+$/i;

let evaluate = () => {
  let values = [];
  for (var i = 0; i < 6; ++i){
    var tmp = $(`#dimension${i + 1}`).val();
    
    if (!isNumber.test(tmp))
      break;
    
    values.push(Number.parseInt(tmp));
  }

  if (values.length < 3)
    return;
  // Vaciado de la tabla
  $('#table').html('');

  let res = matrixChainOrden(values);

  for (var i = 0; i < values.length; ++i){
    let view = `<div class="row">\n`;
    
    for (var j = 0; j < values.length; ++j){

      if (j === 0){
        view += `<div class="col s1 bars" id="c${i}${j}"></div>\n<div class="col s11"><div class="row">`;
        continue;
      }

      var size = `${Math.floor(12 / (values.length - 1))}`
      var classes = `${i === 0 ? 'bars' : 'parent'} col s${size}`;
      var content = `${i === 0 ? '' : 'content'}`;
      view += `<div class ="${classes}" id="c${i}${j}">\n<div class="${content}">\n</div></div>\n`;
    }
    view += '</div></div></div>';

    $('#table').append(view);
  }

  for (var i = 1; i < values.length; ++i){
    $(`#c${0}${i}`).append(String.fromCharCode(64 + i));
    $(`#c${i}${0}`).append(String.fromCharCode(64 + i));
  }

  for (var i = 0; i < res.length; ++i){
    for (var j = 0; j < res.length; ++j){
      if (res[i][j].peek().cost === 0){
        $(`#c${i + 1}${j + 1} > .content`).html('X');
        continue;
      }

      var data = '';
      var best = true;
      while (!res[i][j].isEmpty()){
        var tmp = res[i][j].pop();
        data += `<p><span class="${best ? 'best-cost' : 'cost'}">${tmp.cost} </span>`;
        data += `<span class="${best ? 'best-part' : 'part'}">${tmp.data}</span><br>`;
        data += `<span class="${best ? 'best-op' : 'op'}">${tmp.operation}</p>`;
        best = false;
      }
      $(`#c${i + 1}${j + 1} > .content`).html(data);
    }
  }
}

// document ready
$(_ => {
  $('#eval').click(evaluate);
});