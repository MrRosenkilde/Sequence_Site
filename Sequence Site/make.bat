emcc -o sequences.html primes.c collats.c fibonachi.c^
 -O0^
 -s WASM=1^
 -s USE_PTHREADS=1^
 -s PTHREAD_POOL_SIZE=8^
 -s NO_EXIT_RUNTIME=1^
 -s EXTRA_EXPORTED_RUNTIME_METHODS="['ccall','cwrap', 'getValue','setValue']"^
 -s EXPORTED_FUNCTIONS="['_primes_parallel','_primes_sequentiel','_primes_count_approx','_collats_sequence','_fibonachi']"^
 -s ALLOW_MEMORY_GROWTH=1^
 -s WASM_MEM_MAX=2097MB^
 -s TOTAL_MEMORY=1024MB^
 -s FORCE_FILESYSTEM=1^
 --shell-file html_template/primes.html^
 --emrun^
& emrun sequences.html
 
 



