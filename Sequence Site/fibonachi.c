#include <stdio.h>
#include <stdlib.h>

int * fibonachi(int n){
	int * results = malloc(sizeof(*results) * n);
	int x = 0; int y = 1;
	if(n > 0) results[0] = x;
	if(n> 1) results[1] = y;
	for(int i = 2; i<=n;i+=2){
		x += y;
		y += x;
		if(x >= 0) results[i] = x;
		if(y >= 0 && y > x) results[i + 1] = y;
		else {
			printf("overflow at fib %d",i);
			return results;	
		} 
	}
	return results;
}

