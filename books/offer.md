# 剑指offer涉及到的题目

## 1. 二维数组中的查找
### 题目
在一个二维数组中（每个一维数组的长度相同），每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。
### 思路
- 首先选取数组中右上角的数字，
- 如果该数字等于要查找的数字，查找过程结束
- 如果该数字大于要查找的数字，则说明其所在列各个数字都大于target，则剔除所在列
- 如果该数字小于所要查找的数字，则说明其所在行都小于target，则剔除所在行
### 代码
```c++
  class Solution {
public:
    bool Find(int target, vector<vector<int> > array) {

        int rows = array.size();
        int cols = array[0].size();
        bool found = false;
        if(rows>0 && cols > 0){
           if(target < array[0][0] || target > array[rows-1][cols-1]) return found;
            int row = 0;
            int col = cols - 1;
            while(row < rows && col >= 0){
                if(array[row][col] == target){
                    found = true;
                    break;
                }
                else if(array[row][col] > target){
                    col --;
                }else{
                    row ++;
                }
            }
        }
        return found;
    }
};
```
### 考虑情况

- 输入值在最大值最小值之间
- 输入值在最大值最小值之外
- array为空


## 2. 替换空格
## 题目描述

请实现一个函数，将一个字符串中的每个空格替换成“%20”。例如，当字符串为We Are Happy.则经过替换之后的字符串为We%20Are%20Happy。

## 思路
- 原地转换，转换之后长度 = 原字符串长度 + 2*空格数
- 维护2个指针，一个指向原字符串尾部，一个指向转换之后长度的尾部
- 向前遍历，如果是空格则插入3个下标20%，如果不是则插入原字符

## 代码
```c++
  class Solution {
public:
	void replaceSpace(char *str,int length) {
        if(str == NULL && length <= 0) return;
        int originLength = 0, numberOfBlank = 0, i = 0;
        while(str[i]!='\0'){
            originLength++;
            if(str[i]==' '){
                numberOfBlank++;
            }
            i++;
        }
        int newLength = originLength + numberOfBlank * 2;
        if(newLength > length)return;
        int indexOfOrigin = originLength;
        int indexOfNew = newLength;
        while(indexOfOrigin >= 0 && indexOfNew >= indexOfOrigin ){
            if(str[indexOfOrigin] == ' '){
                str[indexOfNew --] = '0';
                str[indexOfNew --] = '2';
                str[indexOfNew --] = '%';
            }else{
                str[indexOfNew --]  = str[indexOfOrigin];
            }
            -- indexOfOrigin;
        }
	}
};
```
## 考虑情况
- 空格出现在最前，最后，中间
- 没有空格
- 输入为空，只有空格

## 3. 重建二叉树

### 题目

输入某二叉树的前序遍历和中序遍历的结果，请重建出该二叉树。假设输入的前序遍历和中序遍历的结果中都不含重复的数字。例如输入前序遍历序列{1,2,4,7,3,5,6,8}和中序遍历序列{4,7,2,1,5,3,8,6}，则重建二叉树并返回。

### 思路

- 前序遍历的第一个节点总是树的根节点，中序序列中根节点左边的值属于左子树，右边的值属于右子树
- 利用6个指针，4个指针指向前序和中序数组的开头和结尾，通过比较前序数组第一个元素与中序数组的值，得到左子树的长度，拿1个指针指向前序数组的左子树的结尾，1个指针指向rootInoder
- 再递归
### 代码
```c++
  public:
  struct BinaryTreeNode
  {
    int m_nValue;
    BinaryTreeNode* m_pLeft;
    BinaryTreeNode* m_pRight;
  };
 
     BinaryTreeNode* ConstructCore
  (
    int* startPreorder, int* endPreorder,
    int* startInorder, int* endInorder
  )
  {
    int rootValue = startPreorder[0];
    BinaryTreeNode* root = new BinaryTreeNode();
    root -> m_nValue = rootValue;
    root -> m_pLeft = root -> m_pRight = NULL;
    if(startPreorder == endPreorder)
    {
      if(startInorder == endInorder && *startPreorder == *startInorder)
      {
        return root;
      }
    }
    int* rootInorder = startInorder;
    while(rootInorder <= endInorder && *rootInorder !== rootValue){
        ++ rootInorder;
    }
       if(rootInorder == endInorder && *rootInorder !== rootValue)
      int leftLength = rootInorder - startInorder;
      int* leftPreorderEnd = startPreorder + leftLength;
      if(leftLength > 0){
          root->m_pLeft = ConstructCore(startPreorder+1,leftPreorderEnd,startInorder,rootInorder-1);
      }
      if(leftLength<endPreorder-startPreorder){
             root->m_pRight = ConstructCore(leftPreorderEnd + 1, endPreorder, rootInorder+1, endInorder);
      }
      return root;
  }
    TreeNode* reConstructBinaryTree(int* pre, int* vin) {
        int length = pre.size();
        if(pre == NULL || vin == NULL || length <= 0){
          return NULL;
        }
    return ConstructCore(pre, pre+length-1, vin, vin+length - 1);
    }
```

### 考虑情况
- 普通二叉树（完全二叉树，不完全二叉树）
- 特殊二叉树（没有节点，有左节点，有右节点，只有一个节点）
- 特殊输入（前中不匹配，根节点为NULL）

## 4. 用两个栈实现一个队列

### 题目

用两个栈来实现一个队列，完成队列的Push和Pop操作。 队列中的元素为int类型。

### 思路

- 如果stack2中不为空，在stack2中的栈顶元素是最先进入队列，可以弹出。
- 如果stack2为空，则把stack1中的元素逐个弹出并压入stack2。


### 代码
```c++
  class Solution
{
public:
    void push(int node) {
        stack1.push(node);
    }

    int pop() {
        if(stack2.size() <= 0){
            while(stack1.size() > 0){
                int tmp = stack1.top();
                stack1.pop();
                stack2.push(tmp);
            }
        }
        int head = stack2.top();
        stack2.pop();
        return head;
        
    }

private:
    stack<int> stack1;
    stack<int> stack2;
};
```
