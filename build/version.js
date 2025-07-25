/**
 * @description: 生成 版本文件
 * @author: M.yunlong
 */

// 获取 node 子进程
const { exec } = require('child_process');

// node 操作文件
let fs = require('fs');

// 读取 package.json 文件
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

// 获取 package.json 中的 name 属性的值
const projectName = packageJson.name;

// 构建时间
let buildDate = new Date().toLocaleString();

// 分支名称
let gitBranch = '';

// 分支名称
exec('git symbolic-ref --short -q HEAD', (err, stdout, stderr) => {
    // 设值
    gitBranch = stdout;
});

// 最后一次 提交信息
let lastCommitId = '';

// 最后一次 提交 commit id
exec('git rev-parse --short HEAD', (err, stdout, stderr) => {
    lastCommitId = stdout;
});

// 监听参数获取 完毕
process.on('exit', function (code) {
    // 生成版本文件
    fs.writeFileSync(
        `./${projectName}/version.txt`,
        `
        构建 时间 : ${buildDate}

        构建 branch: ${gitBranch}
        commit id: ${lastCommitId}
    `,
    );

    // 打印
    console.log(`
        构建 时间 : ${buildDate}
        
        构建 branch: ${gitBranch}
        commit id: ${lastCommitId}
    `);
});
