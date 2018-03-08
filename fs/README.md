# file system -- 文件系统

*File I/O is provided by simple wrappers around standard POSIX functions. To use this module do <code>require('fs')</code>. All the methods have asynchronous and synchronous forms.*

文件 I/O 是对标准 POSIX 函数的简单封装。 通过 require('fs') 使用该模块。 所有的方法都有异步和同步的形式

*The asynchronous form always takes a completion callback as its last argument. The arguments passed to the completion callback depend on the method, but the first argument is always reserved for an exception. If the operation was completed successfully, then the first argument will be <code>null</code> or <code>undefined</code>.*

异步方法的最后一个参数都是一个回调函数。 传给回调函数的参数取决于具体方法，但回调函数的第一个参数都会保留给异常。 如果操作成功完成，则第一个参数会是 <code>null</code> 或 <code>undefined</code>

*When using the synchronous form any exceptions are immediately thrown. Exceptions may be handled using <code>try</code>/<code>catch</code>, or they may be allowed to bubble up.*

当使用同步方法时，任何异常都会被立即抛出。 可以使用 <code>try</code>/<code>catch</code> 来处理异常，或让异常向上冒泡


**List**

* demo0000 -- Basic
* demo0001 -- writeFile & readFile
* demo0002 -- readdir
* demo0003 -- rename
