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