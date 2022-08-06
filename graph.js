class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for (let v of vertexArray) {
      this.nodes.add(v);
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    for (let n of this.nodes) {
      if (n.adjacent.has(vertex)) {
        n.adjacent.delete(vertex);
      }
    }
    this.nodes.delete(vertex);
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    const theVisitedSet = new Set();
    const theResultArray = [];

    function traverse(vertex) {
      if (!vertex) return null;
      theVisitedSet.add(vertex);
      theResultArray.push(vertex.value);
      vertex.adjacent.forEach((n) => {
        if (!theVisitedSet.has(n)) return traverse(n);
      });
    }

    traverse(start);

    return theResultArray;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    const theQueue = [start];
    const theResultArray = [];
    const theVisitedSet = new Set();
    let currentVertex;
    theVisitedSet.add(start);
    while (theQueue.length) {
      currentVertex = theQueue.shift();
      theResultArray.push(currentVertex.value);
      currentVertex.adjacent.forEach((n) => {
        if (!theVisitedSet.has(n)) {
          theVisitedSet.add(n);
          theQueue.push(n);
        }
      });
    }
    return theResultArray;
  }
}

module.exports = { Graph, Node };
