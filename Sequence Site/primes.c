#include <stdio.h>
#include <math.h>
#include <stdlib.h>
#include <time.h>
#include <pthread.h>
#include <string.h>
#define BITMAP_BYTESIZE 16

const unsigned int one = 0x1;
void bitmap_set(unsigned int* bitmap, unsigned int bit_n) {
	unsigned int* p = (bitmap + bit_n / (BITMAP_BYTESIZE));
	short move_left = (bit_n % (BITMAP_BYTESIZE));
	unsigned int desired_bit = one << move_left;
	*p = *p | desired_bit;
}
void  bitmap_set0(unsigned int* bitmap, unsigned int bit_n) {
	unsigned int* p = (bitmap + bit_n / BITMAP_BYTESIZE);
	unsigned int desired_bit = one << (bit_n % BITMAP_BYTESIZE);
	unsigned int desired_bit_flipped = ~desired_bit;
	*p = *p & desired_bit_flipped;
}
short  bitmap_get(unsigned int* bitmap, unsigned int bit_n) {
	unsigned int* p = (bitmap + bit_n / (BITMAP_BYTESIZE));
	unsigned int desired_bit = one << (bit_n % BITMAP_BYTESIZE);
	unsigned int and_result = *p & desired_bit;
	short result = and_result == desired_bit;
	return result;
}
void bitmap_print(unsigned int* bitmap, unsigned int bits) {
	for (int i = 0; i < bits; i++) {
		printf("%d", bitmap_get(bitmap, i));
	}
	printf("\n");
}
unsigned int* bitmap_init(unsigned int bits) {
	unsigned int* bitmap = malloc(sizeof(*bitmap) * (bits / BITMAP_BYTESIZE + 1));
	for (int i = 0; i < bits / BITMAP_BYTESIZE; i++) {
		unsigned int* p = (bitmap + i);
		*p = 0x0;
	}
	return bitmap;

}
struct not_prime_runner_struct {
	short* bool_arr;
	unsigned int index;
	unsigned int limit;
};

struct primes_result {
	unsigned int* primes_pointer;
	unsigned int count;
};
void* mark_not_primes_runner(void* args) {
	struct not_prime_runner_struct* data = (struct not_prime_runner_struct*) args;
	unsigned int index = data->index;
	short* bool_arr = data->bool_arr;
	unsigned int limit = data->limit;
	for (unsigned int j = index * index; j <= limit; j += index) {
		*(bool_arr + j) = 1;
	}
	return args;
}
float primes_count_approx(unsigned int n) {
	return (n / log(n)) * (1 + 1.2762f / log(n));
}
unsigned int* primes_sequentiel(unsigned int n) {
	clock_t begin = clock();
	printf("finding primes below %u\n", n);
	unsigned int* write_results_to = malloc(sizeof(*write_results_to) * primes_count_approx(n) );
	unsigned int* bitmap = bitmap_init(n + 1);
	unsigned int n_sqrt = sqrt(n);
	for (int i = 2; i <= n_sqrt; ++i) {
		if (!bitmap_get(bitmap, i)) {
			for (int j = i * i; j <= n; j += i) {
				bitmap_set(bitmap, j);
			}
		}
	}
	printf("marked primes\n");
	unsigned int primes_written = 0;
	for (unsigned int i = 2; i <= n; i++) {
		if (!bitmap_get(bitmap, i)) {
			*(write_results_to + primes_written) = i;
			++primes_written;
		}
	}
	free(bitmap);
	printf("prime count: %u\n", primes_written);
	clock_t end = clock();
	printf("Execution time: %f seconds \n", (float)(end - begin) / CLOCKS_PER_SEC);
	return write_results_to;
}
unsigned int* primes_parallel(unsigned int n) {
	clock_t begin = clock();
	printf("finding primes below %u\n", n);
	unsigned int* write_results_to = malloc(sizeof(*write_results_to) * primes_count_approx(n) );
	short* bool_arr = malloc(sizeof(*bool_arr) * n);
	for (int i = 0; i < n; i++) { *(bool_arr + i) = 0; }
	unsigned int n_sqrt = sqrt(n);
	short threadc = 8;
	pthread_t* threads = malloc(sizeof(*threads) * threadc);
	pthread_attr_t attr;
	short count = 0;
	for(int i = 0; i<threadc;i++){
		printf("thread address: %p\n", (threads + i) );
	}
	for (unsigned int i = 2; i <= n_sqrt; ++i) {
		if (*(bool_arr + i) == 0) {
			if (count == threadc) { //if all threads are used, wait for threads to finish
				for (int j = 0; j < threadc; j++) {
					if (pthread_join(*(threads + j), NULL)) {
						perror("Thread join failed");
					}
				}
				count = 0;
			}
			struct not_prime_runner_struct* data = malloc(sizeof(*data));
			data->bool_arr = bool_arr;
			data->index = i;
			data->limit = n;	
			pthread_attr_init(&attr);
			pthread_create((threads + count), &attr, mark_not_primes_runner, data);
			++count;
		}
	}
	for (int i = 0; i < count; i++) {
		if (pthread_join(*(threads + i), NULL)) {
			perror("Thread join failed");
		}
	}
	printf("marked primes\n");
	unsigned int primes_written = 0;
	for (unsigned int i = 2; i <= n; i++) {
		if (!*(bool_arr + i)) {
			*(write_results_to + primes_written) = i;
			++primes_written;
		}
	}
	printf("prime count: %u\n", primes_written);
	clock_t end = clock();
	printf("Execution time: %fseconds \n", (float)(end - begin) / CLOCKS_PER_SEC);
	return write_results_to;
}
