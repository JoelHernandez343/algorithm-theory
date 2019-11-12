/*
 * Code by: Joel Hernández
 */

import { Heap } from './heap.js';

class Information {
  constructor (cost = 0, data = '', operation = ''){
    this.cost = cost;
    this.data = data;
    this.operation = operation;
  }

  toString() {
    return `{${this.cost},${this.data}}`;
  }
}

let showMtx = m => {
  console.log('=======');
  for (var i = 0; i < m.length; ++i){
    var data = '';
    for (var j = 0; j < m[i].length; ++j)
      data += `[${m[i][j].getHeap()}] `;
    console.log(data);
  }
}

let initInfoArray = (i, j) => {
  let r = new Heap((a, b) => a.cost < b.cost);

  r.push(new Information(0, i === j ? String.fromCharCode(65 + i) : '' ));

  return r;
}

let matrixChainOrden = dims => {
  const n = dims.length - 1;

  // Declaración de la tabla para guardar resultados:
  let m = Array(n);
  for (var i = 0; i < n; ++i){
    m[i] = new Array(n);

    for (var j = 0; j < n; ++j)
      m[i][j] = initInfoArray(i, j);
  }

  // Recorrimiento de la tabla
  for (var r = 1; r < n; ++r){
    for (var i = 0; i < n - r; ++i){
      j = i + r;
      m[i][j].pop();
      m[i][j].push(new Information(Infinity));

      // Recorrimiento de los máximos posibles
      for (var k = i; k < j; ++k){
        var cost = m[i][k].peek().cost + m[k + 1][j].peek().cost + dims[i] * dims[k + 1] * dims[j + 1];
        var operation = `${m[i][k].peek().cost} + ${m[k + 1][j].peek().cost} + ${dims[i]}x${dims[k + 1]}x${dims[j + 1]} = ${cost}`;
        // Armado de el agrupamiento utilizado
        var data = '(' + m[i][k].peek().data + m[k + 1][j].peek().data + ')';

        // No es necesario el Infinity
        if (m[i][j].peek().cost === Infinity)
          m[i][j].pop();
        
        // El heap recibe el nuevo costo
        m[i][j].push(new Information(cost, data, operation));
      }

      // showMtx(m);
    }
  }

  return m;
}

export { matrixChainOrden }