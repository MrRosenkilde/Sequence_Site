#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <time.h>
struct linked_list
{
    unsigned int value;
    struct linked_list *next;
};
struct linked_list* linked_list_init(unsigned int * initial_value){
	struct linked_list* head = malloc(sizeof(*head));
	head->next=NULL;
	head->value= *initial_value;
	return head;
}
struct linked_list *linked_list_add(unsigned int value, struct linked_list *head)
{
    struct linked_list *current = head;
    while (current->next != NULL)
        current = current->next;
    struct linked_list *next = malloc(sizeof(*next));
    next->next = NULL;
    next->value = value;
    current->next = next;
    return next;
}
unsigned int linked_list_count(struct linked_list *head){
	struct linked_list *current = head;
	unsigned int i;
	for(i = 1; current->next!=NULL;i++)
		current = current->next;
	return ++i;
}
unsigned int *linked_list_extract_arr(struct linked_list *head,unsigned int count){
	unsigned int* arr = malloc(sizeof(*arr) * count + 1);
	struct linked_list *current = head;
	for(int i = 0; i<=count;i++){
		*(arr +i) = current ->value;
		current = current->next;
	}
	return arr;
}

void linked_list_print(struct linked_list *head)
{
    do
    {
        printf("%u\n", head->value);
        head = head->next;
    } while (head->next != NULL);
}

short isEven(long long n)
{
    return (n | 1) != n;
}
unsigned int next_collats(unsigned int n)
{
    return isEven(n) ? n / 2 : 3 * n + 1;
}
unsigned int * collats_sequence(unsigned int n)
{
	printf("Input = %u\n",n);
	clock_t start = clock();
	struct linked_list *head = linked_list_init(&n);
	struct linked_list *tmp_head = head;
	unsigned int count = 0;
    do
    {
        n = next_collats(n);
        tmp_head = linked_list_add(n, tmp_head);
		++count;
    } while (n != 1);
	unsigned int *results = linked_list_extract_arr(head,count);
	clock_t done = clock();
	printf("Execution Time: %f Seconds\n", (float)(done-start) / CLOCKS_PER_SEC);
    return results;
}
/*int main(){
	unsigned int * results = collats_sequence(7);
	for(unsigned int i = 0; (*(results + i) ) != NULL;i++){
		printf("%u\n",*(results+i));
	}
	return 0;
}*/