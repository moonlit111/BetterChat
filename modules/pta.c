#include <stdio.h>
#include <stdbool.h>
#include <stdlib.h>
int main(){
    int m,n;
    scanf("%d %d",&n,&m);
    int* out=(int*)malloc(sizeof(int)*n);
    int i=0;
    int count=0;
    int call=0;
    bool* isEmpty=(bool*)calloc(n,sizeof(bool));
    for(i=0;count<n;i++){
        if(i>=n){
            i=0;
        }
        while(isEmpty[i]!=false){
            i++;
            if(i>=n){
                i=0;
            }
        }
        call++;
        if(call==m){
            call=0;
            count++;
            isEmpty[i]=true;
            out[count]=i+1;
        }
    }
    for(i=1;i<=n;i++){
        printf("%d ",out[i]);
    }
    return 0;
}