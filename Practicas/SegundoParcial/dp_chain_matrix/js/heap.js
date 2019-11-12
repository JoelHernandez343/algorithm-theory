/* Class heap implementation by gyre
 * StackOverflow user: /7256039/gyre
 * Found in:
 * https://stackoverflow.com/questions/42919469/efficient-way-to-implement-priority-queue-in-javascript
 * Improve by Joel Hernández
 */

class Heap {
  constructor (comparator = (a, b) => a > b) {
    this._heap = [];
    this._comparator = comparator;
  }
  /**
   * Return the heap's size
   */
  size() {
    return this._heap.length;
  }
  /**
   * Return if heap is empty
   */
  isEmpty() {
    return this.size() === 0;
  }
  /**
   * Return the top element
   */
  peek() {
    return this._heap[Heap.top];
  }
  /**
   * Push the elements in the list
   * @param  {...any} values A elements list to push
   */
  push(...values) {
    values.forEach(value => {
      this._heap.push(value);
      this._siftUp();
    });
    return this.size();
  }
  /**
   * Pop the top element in the heap
   */
  pop() {
    const poppedValue = this.peek();
    const bottom = this.size() - 1;

    if (bottom > Heap.top) 
      this._swap(Heap.top, bottom);

    this._heap.pop();
    this._siftDown();

    return poppedValue;
  }
  /**
   * Return `_comparator(_heap[i], _heap[j])`
   * @param {*} i First index
   * @param {*} j Second index
   */
  _greater(i, j) {
    return this._comparator(this._heap[i], this._heap[j]);
  }
  /**
   * Does what you think it does
   * @param {*} i First index
   * @param {*} j Second index
   */
  _swap(i, j) {
    [this._heap[i], this._heap[j]] = [this._heap[j], this._heap[i]];
  }
  /**
   * Update the heap in a `push()` operation
   */
  _siftUp() {
    let node = this.size() - 1;
    while (node > Heap.top && this._greater(node, Heap.parent(node))) {
      this._swap(node, Heap.parent(node));
      node = Heap.parent(node);
    }
  }
  /**
   * Update the heap in a `pop()` operation
   */
  _siftDown() {
    let node = Heap.top;
    let left = Heap.left(node);
    let right = Heap.right(node);
    
    while (
      (left < this.size() && this._greater(left, node)) ||
      (right < this.size() && this._greater(right, node))
    ) {
      let maxChild = (right < this.size() && this._greater(right, left)) ? right : left;
      
      this._swap(node, maxChild);

      node = maxChild;
      left = Heap.left(node);
      right = Heap.right(node);
    }
  }

  getHeap(){
    return this._heap;
  }
};

Heap.top = 0;
/**
 * Get the parent's index
 * @param {*} i Index of child
 */
Heap.parent = i => ((i + 1) >>> 1) - 1;
/**
 * Get the left child
 * @param {*} i Index of parent
 */
Heap.left = i => (i << 1) + 1;
/**
 * Get the right child
 * @param {*} i Index of parent
 */
Heap.right = i => (i + 1) << 1;

export { Heap };