#include <iostream>
#include <list>
#include <queue>
using namespace std;

class Graph {
  int V;
  list<int> *table;
  queue<int> q;
  int *degree;
  public:
    Graph(int V);
    ~Graph();
    void addEdeg(int v, int w);
    bool sort();
}
Graph::Graph(int V){
  this -> V = V;
  table = new list<int>[V];
  
  degree = new int[V];
  for(int i = 0; i < V; i++ ){
     degree[i] = 0;
  }
}
Graph::Graph() {
  delete degree;
  delete table;
}
void Graph::addEdeg(int v, int w){
  table[v].push_back(w);
  degree[v]++;
}
bool Graph::sort() {
  for(int i = 0; i < V; i++){
    if(degree[i]==0){
      q.push(i);
    }
  }
  int count = 0;
  while(!q.empty()){
    int cur = q.front();
    q.pop();
    cout<<"v:"<<v;
    count++;
    list<int>::iterator beg = 
  }
}