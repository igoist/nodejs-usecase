const log = console.log.bind(this);
const circle = require('./circle');

console.log(`半径为 4 的圆的面积是 ${circle.area(4)}`);

const Square = require('./square');

const mySquare = new Square(2);
// const mySquare = new Square.ss(2);
log(`sss: ${mySquare.area()}`);

log(require.main, __filename);

/**
 * 当 Node.js 直接运行一个文件时，`require.main` 会被设为它的 `module`。
 * 这意味着可以通过 `require.main === module` 来判断一个文件是否被直接运行：
 *
 * 对于 `foo.js` 文件，如果通过 `node foo.js` 运行则为 `true`，但如果通过 `require('./foo')` 运行则为 `false`。
 *
 * 因为 `module` 提供了一个 `filename` 属性（通常等同于 `__filename`），所以可以通过检查 `require.main.filename` 来获取当前应用程序的入口点。
 * ...
 * 从 Y 路径的模块 require(X)
 * 1. 如果 X 是一个核心模块，
 *    a. 返回核心模块
 *    b. 结束
 * 2. 如果 X 是以 '/' 开头
 *    a. 设 Y 为文件系统根目录
 * 3. 如果 X 是以 './' 或 '/' 或 '../' 开头
 *    a. 加载文件(Y + X)
 *    b. 加载目录(Y + X)
 * 4. 加载Node模块(X, dirname(Y))
 * 5. 抛出 "未找到"
 *
 * 加载文件(X)
 * 1. 如果 X 是一个文件，加载 X 作为 JavaScript 文本。结束
 * 2. 如果 X.js 是一个文件，加载 X.js 作为 JavaScript 文本。结束
 * 3. 如果 X.json 是一个文件，解析 X.json 成一个 JavaScript 对象。结束
 * 4. 如果 X.node 是一个文件，加载 X.node 作为二进制插件。结束
 *
 * 加载索引(X)
 * 1. 如果 X/index.js 是一个文件，加载 X/index.js 作为 JavaScript 文本。结束
 * 3. 如果 X/index.json  是一个文件，解析 X/index.json 成一个 JavaScript 对象。结束
 * 4. 如果 X/index.node 是一个文件，加载 X/index.node 作为二进制插件。结束
 *
 * 加载目录(X)
 * 1. 如果 X/package.json 是一个文件，
 *    a. 解析 X/package.json，查找 "main" 字段
 *    b. let M = X + (json main 字段)
 *    c. 加载文件(M)
 *    d. 加载索引(M)
 * 2. 加载索引(X)
 *
 * 加载Node模块(X, START)
 * 1. let DIRS=NODE_MODULES_PATHS(START)
 * 2. for each DIR in DIRS:
 *    a. 加载文件(DIR/X)
 *    b. 加载目录(DIR/X)
 *
 * NODE_MODULES_PATHS(START)
 * 1. let PARTS = path split(START)
 * 2. let I = count of PARTS - 1
 * 3. let DIRS = []
 * 4. while I >= 0,
 *    a. if PARTS[I] = "node_modules" CONTINUE
 *    b. DIR = path join(PARTS[0 .. I] + "node_modules")
 *    c. DIRS = DIRS + DIR
 *    d. let I = I - 1
 * 5. return DIRS
 */
