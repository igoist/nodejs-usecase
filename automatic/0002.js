// docker 镜像打包、关联、上传自动化脚本
/* eslint-disable */
const { exec } = require('child_process');
const { version } = require('./package.json');

const ex = (str, showStdout = false) =>
  new Promise((resolve) => {
    // err 之后还有 stdout, stderr
    exec(str, (err, stdout) => {
      if (err) {
        console.log('================ err');
        console.log(err);
        console.log('================');
        resolve(false);
      } else {
        if (showStdout) {
          console.log(stdout);
        }
        resolve(true);
      }
    });
  });

const fn = async ({ project, withStaging }) => {
  const luffyHost = 'hub.upyun.com';
  const projectArr = ['impress-website', 'pledge', 'corazon', ''];

  if (projectArr.indexOf(project) === -1) {
    console.log(`check ${project}`);
    return;
  }

  let taskArr = [];

  taskArr.push('docker build --build-arg NODE_ENV=production .');
  // taskArr.push('docker image ls');

  for (let i = 0; i < taskArr.length; i++) {
    let result = await ex(taskArr[i]);
    if (!result) {
      break;
    }

    console.log(`complete task ${i} - ${taskArr[i]}`);
  }

  const imageId = await new Promise((resolve) => {
    // 获取 docker image ls 打印内容的第二排第三列
    exec(`docker image ls | awk -F ' ' '{print $3}'`, (err, stdout) => {
      // console.log(stdout);
      // console.log(stdout.split('\n'));
      // console.log(stdout.split('\n')[1]);
      if (err) {
        console.log(err);
        resolve(false);
      } else {
        resolve(stdout.split('\n')[1]);
      }
    });
  });

  if (!imageId) {
    console.log('get imageId failed');
    return;
  }

  console.log(`imageId ${imageId}`);

  // console.log(`docker tag ${imageId} ${luffyHost}/yupoo/${project}:${version}`);

  // if (withStaging) {
  //   console.log(`docker tag ${imageId} ${luffyHost}/yupoo/${project}-staging:${version}`);
  // }

  let taskArr2 = [];

  taskArr2.push(`docker tag ${imageId} ${luffyHost}/yupoo/${project}:${version}`);

  if (withStaging) {
    taskArr2.push(`docker tag ${imageId} ${luffyHost}/yupoo/${project}-staging:${version}`);
  }

  for (let i = 0; i < taskArr2.length; i++) {
    let result = await ex(taskArr2[i]);
    if (!result) {
      break;
    }

    console.log(`complete task2 ${i} - ${taskArr2[i]}`);
  }
};

// fn({
//   project: 'pledge',
//   withStaging: true,
// });
